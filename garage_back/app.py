from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

import pandas as pd
import numpy as np
import traceback
import time
import threading
import io
import base64
import sys

import matplotlib
matplotlib.use("Agg")

import matplotlib.pyplot as plt
import seaborn as sns
import sklearn

from garage_back.quiz_data import QUIZ_DATA
from garage_back.level_data import LEVEL_CONTENT


app = Flask(
    __name__,
    static_folder='../garage_front',
    static_url_path=''
)

CORS(app)


# =========================
# SESSION STORE
# =========================
user_sessions = {}
session_envs = {}

SESSION_TTL = 3600
CLEANUP_INTERVAL = 60

MAX_ENERGY = 5
ENERGY_RECOVERY_SECONDS = 120


# =========================
# BADGES
# =========================
LEVEL_BADGES = {
    1: "Dataset Explorer",
    2: "Feature Engineer",
    3: "Python Wrangler",
    4: "Data Cleaner",
    5: "Outlier Hunter",
    6: "EDA Analyst",
    7: "Model Trainer",
    8: "ML Master"
}


# =========================
# EXEC ENV
# =========================
def build_exec_env():
    return {
        "__builtins__": __import__("builtins"),

        "pd": pd,
        "np": np,
        "plt": plt,
        "sns": sns,
        "sklearn": sklearn,

        "train_test_split":
            __import__("sklearn.model_selection")
            .model_selection
            .train_test_split,

        "LinearRegression":
            __import__("sklearn.linear_model")
            .linear_model
            .LinearRegression,
    }


# =========================
# ENERGY REGEN
# =========================
def regenerate_energy(user):

    now = time.time()

    last_update = user.get(
        "energy_last_update",
        now
    )

    if user["energy"] >= MAX_ENERGY:
        user["energy_last_update"] = now
        return

    elapsed = now - last_update

    recovered_units = int(
        elapsed // ENERGY_RECOVERY_SECONDS
    )

    if recovered_units > 0:

        user["energy"] = min(
            MAX_ENERGY,
            user["energy"] + recovered_units
        )

        user["energy_last_update"] = now


# =========================
# SESSION CLEANUP
# =========================
def cleanup_sessions():

    while True:

        try:

            now = time.time()

            expired = []

            for sid, data in list(
                user_sessions.items()
            ):

                last_active = data.get(
                    "last_active",
                    now
                )

                if now - last_active > SESSION_TTL:
                    expired.append(sid)

            for sid in expired:

                user_sessions.pop(
                    sid,
                    None
                )

                session_envs.pop(
                    sid,
                    None
                )

        except:
            pass

        time.sleep(
            CLEANUP_INTERVAL
        )


threading.Thread(
    target=cleanup_sessions,
    daemon=True
).start()


# =========================
# HOME
# =========================
@app.route('/')
def home():

    return send_from_directory(
        '../garage_front',
        'index.html'
    )


# =========================
# LOGIN
# =========================
@app.route(
    '/api/login',
    methods=['POST']
)
def login():

    data = request.json

    username = data.get(
        "username"
    )

    session_id = data.get(
        "session_id",
        username
    )

    if session_id not in user_sessions:

        user_sessions[
            session_id
        ] = {

            "username": username,

            "xp": 0,

            "energy": MAX_ENERGY,

            "energy_last_update":
                time.time(),

            "current_level": 1,

            "completed_levels": [],

            "badges": [],

            "dataset_features": [],

            "created_at":
                time.time(),

            "last_active":
                time.time()
        }

        session_envs[
            session_id
        ] = build_exec_env()

    user_sessions[
        session_id
    ][
        "last_active"
    ] = time.time()

    regenerate_energy(
        user_sessions[
            session_id
        ]
    )

    return jsonify({
        "success": True,
        "user_data":
            user_sessions[
                session_id
            ]
    })


# =========================
# LEVEL CONTENT
# =========================
@app.route(
    '/api/get_level_content',
    methods=['POST']
)
def get_level_content():

    data = request.json

    level = data.get(
        "level",
        1
    )

    tab = data.get(
        "tab",
        "learn"
    )

    content = (
        LEVEL_CONTENT
        .get(level, {})
        .get(tab, "Not found")
    )

    return jsonify({
        "content": content
    })


# =========================
# QUIZ
# =========================
@app.route(
    '/api/get_quiz',
    methods=['POST']
)
def get_quiz():

    data = request.json

    level = data.get(
        "level",
        1
    )

    return jsonify({
        "quiz":
            QUIZ_DATA.get(
                level,
                []
            )
    })


# =========================
# SUBMIT QUIZ
# =========================
@app.route(
    '/api/submit_quiz',
    methods=['POST']
)
def submit_quiz():

    data = request.json

    session_id = data.get(
        "session_id"
    )

    level = data.get(
        "level"
    )

    answers = data.get(
        "answers",
        []
    )

    if session_id not in user_sessions:

        return jsonify({
            "success": False,
            "error": "Invalid session"
        })

    user = user_sessions[
        session_id
    ]

    user[
        "last_active"
    ] = time.time()

    regenerate_energy(
        user
    )

    # energy empty
    if user["energy"] <= 0:

        return jsonify({
            "success": False,
            "energy_empty": True,
            "message":
                "Your energy is empty. Revise your lessons and come back stronger. Energy restores every 2 minutes."
        })

    quiz = QUIZ_DATA.get(
        level,
        []
    )

    correct = 0

    for i, ans in enumerate(
        answers
    ):

        if (
            i < len(quiz)
            and quiz[i][
                "correct"
            ] == ans
        ):
            correct += 1

    passed = correct >= 4

    # level reward
    if (
        passed
        and level not in user[
            "completed_levels"
        ]
    ):

        user[
            "completed_levels"
        ].append(
            level
        )

        # fixed xp
        user[
            "xp"
        ] += 5

        user[
            "current_level"
        ] = min(
            level + 1,
            8
        )

        badge = LEVEL_BADGES.get(
            level
        )

        if (
            badge
            and badge not in user[
                "badges"
            ]
        ):

            user[
                "badges"
            ].append(
                badge
            )

    # lose energy
    wrong = 5 - correct

    user[
        "energy"
    ] = max(
        0,
        user["energy"] - wrong
    )

    if user["energy"] < MAX_ENERGY:

        user[
            "energy_last_update"
        ] = time.time()

    max_xp = 40

    xp_percent = int(
        (
            user["xp"] / max_xp
        ) * 100
    )

    return jsonify({

        "success": True,

        "passed": passed,

        "correct_count":
            correct,

        "xp_gained":
            5 if passed else 0,

        "total_xp":
            user["xp"],

        "max_xp":
            max_xp,

        "xp_percent":
            xp_percent,

        "energy":
            user["energy"],

        "current_level":
            user["current_level"],

        "badges":
            user["badges"],

        "completed_levels":
            user[
                "completed_levels"
            ]
    })


# =========================
# EXEC CODE
# =========================
def run_code(
    code,
    env,
    timeout=5
):

    result = {
        "success": False,
        "output": "",
        "error": None,
        "image": None
    }

    def target():

        try:

            old_stdout = sys.stdout

            sys.stdout = io.StringIO()

            plt.close("all")

            exec(
                code,
                env
            )

            output_text = (
                sys.stdout.getvalue()
            )

            img = None

            try:

                if plt.get_fignums():

                    buf = io.BytesIO()

                    plt.savefig(
                        buf,
                        format="png"
                    )

                    buf.seek(0)

                    img = (
                        base64
                        .b64encode(
                            buf.read()
                        )
                        .decode("utf-8")
                    )

                    plt.close("all")

            except:
                img = None

            result[
                "success"
            ] = True

            result[
                "output"
            ] = (
                output_text
                # if output_text
                # else "Execution complete"
            )

            result[
                "image"
            ] = img

            sys.stdout = old_stdout

        except:

            result[
                "error"
            ] = traceback.format_exc()

    thread = threading.Thread(
        target=target
    )

    thread.start()

    thread.join(
        timeout
    )

    if thread.is_alive():

        return {
            "success": False,
            "error":
                "Timeout (5s limit)"
        }

    return result


@app.route(
    '/api/execute_code',
    methods=['POST']
)
def execute_code():

    data = request.json

    code = data.get(
        "code",
        ""
    )

    sid = data.get(
        "session_id"
    )

    try:

        if sid not in session_envs:

            session_envs[
                sid
            ] = build_exec_env()

        env = session_envs[
            sid
        ]

        return jsonify(
            run_code(
                code,
                env
            )
        )

    except Exception as e:

        return jsonify({
            "success": False,
            "error": str(e)
        })


# =========================
# SAVE FEATURES
# =========================
@app.route(
    '/api/save_dataset_features',
    methods=['POST']
)
def save_dataset_features():

    data = request.json

    sid = data.get(
        "session_id"
    )

    features = data.get(
        "features",
        []
    )

    if sid in user_sessions:

        user_sessions[
            sid
        ][
            "dataset_features"
        ] = features

        user_sessions[
            sid
        ][
            "last_active"
        ] = time.time()

        return jsonify({
            "success": True
        })

    return jsonify({
        "success": False
    })


# =========================
# RUN
# =========================
if __name__ == "__main__":
    app.run(debug=True)
