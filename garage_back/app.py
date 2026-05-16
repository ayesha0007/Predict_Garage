from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import pandas as pd
import numpy as np
import json
import os
from quiz_data import QUIZ_DATA
from level_data import LEVEL_CONTENT
import traceback

app = Flask(__name__, static_folder='../garage_front', static_url_path='')
CORS(app)

# Store user sessions (in production use database)
user_sessions = {}

@app.route('/')
def serve_index():
    return send_from_directory('../garage_front', 'index.html')

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    session_id = data.get('session_id', username)
    
    if session_id not in user_sessions:
        user_sessions[session_id] = {
            'username': username,
            'current_level': 1,
            'xp': 250,
            'energy': 5,
            'completed_levels': [],
            'mission_status': {},
            'badges': ['Newbie'],
            'dataset_features': []
        }
    
    return jsonify({
        'success': True,
        'user_data': user_sessions[session_id]
    })

@app.route('/api/get_level_content', methods=['POST'])
def get_level_content():
    data = request.json
    level = data.get('level', 1)
    tab = data.get('tab', 'learn')
    
    content = LEVEL_CONTENT.get(level, {}).get(tab, "Content not available")
    return jsonify({'content': content, 'tab': tab})

@app.route('/api/get_quiz', methods=['POST'])
def get_quiz():
    data = request.json
    level = data.get('level', 1)
    
    quiz = QUIZ_DATA.get(level, [])
    return jsonify({'quiz': quiz})

@app.route('/api/submit_quiz', methods=['POST'])
def submit_quiz():
    data = request.json
    session_id = data.get('session_id')
    level = data.get('level')
    answers = data.get('answers')
    
    if session_id not in user_sessions:
        return jsonify({'success': False, 'error': 'Session not found'})
    
    user = user_sessions[session_id]
    quiz = QUIZ_DATA.get(level, [])
    
    correct_count = 0
    for i, ans in enumerate(answers):
        if i < len(quiz) and ans == quiz[i]['correct']:
            correct_count += 1
    
    # Calculate XP (5 per correct answer)
    xp_gained = correct_count * 5
    passed = correct_count >= 4  # Need 4/5 to pass
    
    if passed:
        if level not in user['completed_levels']:
            user['completed_levels'].append(level)
            user['xp'] += xp_gained
            user['current_level'] = level + 1 if level < 8 else 8
            
            # Add badge
            if level == 1 and 'Data Explorer' not in user['badges']:
                user['badges'].append('Data Explorer')
            elif level == 2 and 'Data Builder' not in user['badges']:
                user['badges'].append('Data Builder')
    
    # Deduct energy for wrong answers
    wrong_answers = 5 - correct_count
    user['energy'] = max(0, user['energy'] - wrong_answers)
    
    return jsonify({
        'success': True,
        'passed': passed,
        'correct_count': correct_count,
        'xp_gained': xp_gained,
        'total_xp': user['xp'],
        'energy': user['energy'],
        'current_level': user['current_level'],
        'badges': user['badges']
    })

@app.route('/api/execute_code', methods=['POST'])
def execute_code():
    data = request.json
    code = data.get('code', '')
    
    try:
        # Create a safe execution environment
        exec_globals = {
            'pd': pd,
            'np': np,
            'plt': __import__('matplotlib.pyplot'),
            'sns': __import__('seaborn'),
            'sklearn': __import__('sklearn')
        }
        
        # Capture output
        import io
        import sys
        old_stdout = sys.stdout
        sys.stdout = io.StringIO()
        
        try:
            exec(code, exec_globals)
            output = sys.stdout.getvalue()
            result = {'success': True, 'output': output if output else 'Code executed successfully!'}
        except Exception as e:
            result = {'success': False, 'error': str(e), 'traceback': traceback.format_exc()}
        finally:
            sys.stdout = old_stdout
        
        return jsonify(result)
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

@app.route('/api/save_dataset_features', methods=['POST'])
def save_dataset_features():
    data = request.json
    session_id = data.get('session_id')
    features = data.get('features', [])
    
    if session_id in user_sessions:
        user_sessions[session_id]['dataset_features'] = features
        return jsonify({'success': True})
    return jsonify({'success': False})

if __name__ == '__main__':
    app.run(debug=True, port=5000)