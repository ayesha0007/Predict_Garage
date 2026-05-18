# Level content data for AutoML Quest - Car Price Prediction

LEVEL_CONTENT = {
    1: {
        "learn": """## 📊 What is a Dataset in Machine Learning?

A **dataset** is a structured collection of data that is used to train, validate, and test machine learning models. It is the foundation of every ML system—without good data, even the best algorithms fail.

---

## 🧠 Structure of a Dataset

A dataset is typically organized in a **tabular format**:

- **Rows (Samples / Observations)**  
  Each row represents one real-world entity or event.  
  👉 Example: one row = one car

- **Columns (Features / Variables)**  
  Each column represents a measurable property of the data.  
  👉 Example: price, year, fuel type

---

## 🎯 Target Variable (What we predict)

In supervised learning, one column is the **target variable**.

- This is the output the model learns to predict.
- Also called: **label** or **dependent variable**

### Example (Car Price Prediction):
- Target = **Price**
- Features = everything used to predict price

---

## 🚗 Example: Car Dataset

### Features (Inputs):
- Brand (Toyota, BMW, etc.)
- Manufacturing Year
- Fuel Type (Petrol/Diesel/Electric)
- Kilometers Driven
- Engine Capacity
- Transmission Type

### Target (Output):
- Car Price

---

## 🔢 Types of Data in a Dataset

### 1. Numerical Data
Values that are measurable and continuous/discrete:
- Price (e.g., 500000 BDT)
- Year (e.g., 2018)
- Kilometers Driven (e.g., 45000)

### 2. Categorical Data
Non-numeric labels or groups:
- Fuel Type → Petrol / Diesel / Electric
- Brand → Toyota / Honda / BMW
- Color → Red / Black / White

---

## 🧹 Why Data Cleaning is Critical

Raw data is almost never ready for training. It must be cleaned and processed.

### Common Issues:
- Missing values (null data)
- Duplicate entries
- Incorrect formatting
- Outliers (extreme values)

### Impact:
- Clean data → Accurate model predictions
- Dirty data → Biased or wrong predictions

---

## ⚙️ Feature Engineering (Important Concept)

Feature engineering means:
> Transforming raw data into meaningful inputs for ML models.

Examples:
- Converting fuel type into numbers (encoding)
- Extracting car age from year
- Scaling large numeric values

---

## 📈 Why Dataset Quality Matters

A machine learning model is only as good as the data it learns from.

### High-quality dataset:
- Large enough (more samples = better learning)
- Relevant features (useful signals only)
- Balanced data (no bias toward one category)
- Clean and consistent formatting

### Poor dataset leads to:
- Overfitting or underfitting
- Incorrect predictions
- Poor generalization to real-world data

---

## 🧪 Real-world Insight

In production ML systems (like car price prediction apps):
- 80% of work is data preparation
- 20% is model training

This is why datasets are considered the **core engine of machine learning systems**.
""",

        "example": """## 🧾 Example: Structured Dataset for ML Regression

### 📊 Dataset: Used Car Price Prediction

| ID  | Brand      | Year | Fuel Type | Kilometers Driven | Engine CC | Price ($) |
|-----|------------|------|-----------|------------------|-----------|-----------|
| 1   | Toyota     | 2020 | Petrol    | 30000            | 1500      | 22000     |
| 2   | Honda      | 2019 | Diesel    | 45000            | 1600      | 18500     |
| 3   | BMW        | 2021 | Petrol    | 15000            | 2000      | 35000     |
| 4   | Mercedes   | 2018 | Diesel    | 60000            | 2200      | 28000     |
| 5   | Nissan     | 2022 | Petrol    | 10000            | 1400      | 30000     |

---

## 🧠 Explanation (ML Perspective)

### 🔹 1. Each row represents one sample
- Every row = one individual car record
- ML model learns patterns from these rows

### 🔹 2. Column meaning (Feature Engineering view)
- **ID** → Unique identifier (NOT used in training)
- **Brand** → Categorical feature (needs encoding)
- **Year** → Car age indicator (important predictor)
- **Fuel Type** → Categorical feature (Petrol/Diesel)
- **Kilometers Driven** → Usage intensity (numeric feature)
- **Engine CC** → Engine power capacity (numeric feature)

### 🔹 3. Target Variable (Prediction Goal)
- **Price ($)** → This is the **dependent variable (y)**
- Model tries to predict this value

---

## 🎯 ML Concept Mapping

| Type            | Columns |
|----------------|--------|
| Features (X)    | Brand, Year, Fuel Type, Kilometers, Engine CC |
| Target (y)      | Price |
| Identifier      | ID (ignored in training) |

---

## ⚙️ Why this structure matters?

✔ Real-world tabular ML dataset format  
✔ Supports regression problems  
✔ Requires preprocessing (encoding + scaling)  
✔ Directly usable in sklearn pipelines  

---
""",

        "keypoints": """## 🔑 Key Takeaways (ML Fundamentals)

### 🧩 1. What is a Dataset?
- A dataset is a structured collection of data organized into **rows (samples)** and **columns (features)**.
- Each row represents one real-world observation (e.g., a car, a house, a user).

---

### 🎯 2. Features vs Target
- **Features (X):** Input variables used for prediction  
- **Target (y):** Output variable we want to predict  

👉 Example:
- Features → Year, Mileage, Fuel Type  
- Target → Price

---

### 📊 3. Types of Data Columns
- **Numerical Features:** Year, Price, Kilometers
- **Categorical Features:** Brand, Fuel Type
- **Identifier Columns:** ID (NOT used in training)

---

### 🏗️ 4. What Makes a Good Dataset?
A high-quality dataset should have:

- ✔ Sufficient size (ideally 100+ rows for basic ML)
- ✔ Consistent formatting
- ✔ Relevant features (strong relation with target)
- ✔ Balanced distribution (avoid bias)

---

### ⚠️ 5. Common Data Issues
Avoid the following:

- ❌ Missing values (NaN / null)
- ❌ Duplicate rows
- ❌ Irrelevant or noisy features
- ❌ Inconsistent data types (e.g., numbers stored as strings)

---

### 🧠 6. ML Insight (Important Concept)
- ML models do NOT understand raw data meaning
- They only learn **mathematical patterns**
- Better data → Better model performance

---

### 🚀 7. Practical Workflow Preview
1. Collect dataset  
2. Clean & preprocess data  
3. Split into train/test  
4. Train model  
5. Evaluate performance  

""",
   "suggestions": """## 💡 Suggestions for Better Understanding & Practice

### 🧪 1. Practice with Real Datasets
Try working with real-world datasets instead of only theory:
- Kaggle Car Price Dataset
- Titanic Dataset
- House Price Prediction Dataset

👉 This will help you understand real ML pipelines.

---

### ⚙️ 2. Try Simple ML Models First
Before jumping into deep learning:
- Linear Regression
- Logistic Regression
- Decision Trees

👉 These models help you understand core ML logic clearly.

---

### 🧹 3. Always Do Data Preprocessing
Never skip preprocessing steps:
- Handle missing values
- Encode categorical variables
- Normalize/scale numerical features

👉 This step often improves accuracy more than model tuning.

---

### 📊 4. Visualize Your Data
Use plots to understand patterns:
- Histogram → distribution
- Heatmap → correlation
- Scatter plot → relationships

👉 Visualization = better intuition

---

### 🧠 5. Think in Features, Not Raw Data
Always ask:
- Which column actually affects prediction?
- Is this feature useful or noise?

👉 Good feature selection = better model

---

### 🚀 6. Build Small Projects
Start with mini projects:
- Car price prediction
- Student score prediction
- House rent prediction

👉 Projects help you connect theory with real implementation

---

### 🔥 7. Upgrade Step-by-Step
Roadmap:
Dataset → Preprocessing → ML model → Evaluation → Deployment

Don't jump directly to complex DL models.

⚠️ Warning: Some suggestions may contain incorrect or incomplete code, while others may be correct. Always read the documentation carefully, understand the logic, and review the code properly before copying it into your IDE. Do not blindly copy-paste code without verifying and testing it first.

---
"""
    
    },

    2: {

    "learn": """## 🏗️ Designing a Machine Learning Dataset (Feature Construction Stage)

At this stage, your task is to design a structured dataset that can be used for machine learning models, especially regression problems like price prediction.

A dataset is not random data — it is a carefully designed system of **features (inputs)** and **target (output)**.

---

## 📌 Core Requirement

You must include at least:

### 🎯 Minimum Requirement:
👉 **At least 5 meaningful input features (X variables)**

These features should have a direct or indirect relationship with the target variable.

---

## 🧠 Recommended Feature Categories (Car Dataset Example)

### 🚗 Core Features (Mandatory)
- Brand (Toyota, BMW, etc.)
- Manufacturing Year
- Fuel Type (Petrol/Diesel/Electric)
- Kilometers Driven
- Engine Size (CC)

---

### ⚙️ Optional Enhancing Features
- Transmission Type
- Number of Owners
- Mileage (km/l)
- Seating Capacity
- Vehicle Color

---

## 🎯 Important Principle

👉 A good dataset is not about quantity — it is about **feature relevance and predictive power**.

Each feature must answer:
> “Does this column help the model understand the target better?”""",

    "example": """## 🎯 Good vs Bad Feature Selection

### ✅ Good Dataset Design

- Year → affects depreciation
- Brand → brand value impact
- Kilometers Driven → usage level
- Fuel Type → efficiency factor
- Engine CC → performance indicator

👉 Result: Strong predictive power and better ML accuracy

---

### ❌ Poor Dataset Design

- Only Brand + Price
- Only Color + Price
- Random unrelated columns

👉 Problem:
- Weak learning signal
- High error rate
- Poor generalization""",

    "keypoints": """## 💡 Key Takeaways (Feature Engineering Basics)

### 🧩 1. Minimum Feature Rule
- Always use at least **5 meaningful features**
- Fewer features = weak model learning

---

### 🎯 2. Quality > Quantity
- 5 strong features > 20 weak features
- Irrelevant data reduces accuracy

---

### 🧠 3. Feature Relevance Matters
Each feature should:
- Have logical relationship with target
- Represent real-world behavior
- Improve prediction quality

---

### ⚙️ 4. Domain Knowledge is Important
Good datasets come from understanding:
- Real-world systems
- Cause-effect relationships

---

### 🚀 5. Avoid Common Mistakes
- ❌ Random columns
- ❌ Duplicate features
- ❌ Irrelevant variables""",

    "suggestions": """## 💡 Suggestions for Better Dataset Building

### 🧪 1. Think Like a Real Data Scientist
Before adding a feature, ask:
- Does this affect the prediction?
- Is this measurable in real life?

---

### ⚙️ 2. Always Use 5+ Meaningful Features
- Minimum 5 features required
- Mix numerical + categorical data

---

### 🧹 3. Remove Noise Features
Avoid:
- Duplicate columns
- Irrelevant attributes (e.g., random IDs as input)
- Non-informative data

---

### 📊 4. Use Domain Logic
For car dataset:
- Mileage → affects price
- Year → depreciation factor
- Engine size → performance impact

---

### 🚀 5. Build Small Practice Datasets
Try:
- Car price dataset
- House price dataset
- Student performance dataset

---

### 🔥 6. Prepare for Next Stage
This dataset will later be used for:
- Data preprocessing
- Model training
- Evaluation

👉 So design it carefully, not randomly


⚠️ Warning: Some suggestions may contain incorrect or incomplete code, while others may be correct. Always read the documentation carefully, understand the logic, and review the code properly before copying it into your IDE. Do not blindly copy-paste code without verifying and testing it first.
"""
},

    3: {
        "learn": """## 📚 Essential Python Libraries for Machine Learning

In machine learning, we use specialized Python libraries to handle data, perform calculations, visualize patterns, and build models.

Each library has a specific role in the ML pipeline.

---

## 🧠 Core Libraries

### 📊 pandas
Used for structured data handling (tables, CSV, Excel)
- Data loading
- Data cleaning
- Data manipulation

---

### 🔢 numpy
Used for numerical computing
- Mathematical operations
- Arrays and matrices
- Fast computation

---

### 📈 matplotlib
Used for basic data visualization
- Line plots
- Histograms
- Scatter plots

---

### 📊 seaborn
Built on matplotlib for advanced visualization
- Heatmaps
- Statistical plots
- Better styling

---

### 🤖 sklearn (scikit-learn)
Main machine learning library
- Model training
- Data splitting
- Preprocessing
- Evaluation metrics

---

## ⚙️ Standard ML Import Structure

In most ML projects, libraries are imported like this:""",
    "example": """## 📖 Brief in "Suggestions"
    """,
     "keypoints": """## 🔑 Key Takeaways

### 🧩 1. Each Library Has a Role
- pandas → data handling
- numpy → math operations
- matplotlib → basic plots
- seaborn → advanced visualization
- sklearn → machine learning

---

### ⚙️ 2. Import Order Matters (Best Practice)
1. Standard libraries
2. Data libraries
3. Visualization libraries
4. ML libraries

---

### 🧠 3. sklearn is the Core of ML
- Model training
- Prediction
- Evaluation
- Data splitting

---

### 📊 4. Visualization is Important
- Helps understand patterns
- Detects outliers
- Shows relationships

---

### 🚀 5. Always Use Clean Import Style
- Use aliases: pd, np, plt, sns
- Keep imports organized at the top

---""",
     "suggestions": """## 💡 Practical Suggestions (ML Setup Guide)
     ### 📦 1. Standard Library Imports (Always Start Here)
```python
        import numpi as np
        import numpy as np
        port numpi as np
        import panda as pd
        import pandas as pd
        import pd
---
   📊 2. Data Handling (Core Workflow)
   df = pd.read_csv("your_dataset.csv")
        df.head()
        df.head(5)
        df.5
        df.header
        df.isnull().sum()
        df.describe()
   🧹 3. Data Cleaning Basics
        df.dropna()
        df.fillna(0)
        df.drop_duplicates()

⚠️ Warning: Some suggestions may contain incorrect or incomplete code, while others may be correct. Always read the documentation carefully, understand the logic, and review the code properly before copying it into your IDE. Do not blindly copy-paste code without verifying and testing it first.
"""
    },
     4: {

    "learn": """## 🔧 Feature Engineering & Encoding (Level 4)

Machine Learning models cannot directly understand raw categorical or text data.
So, the data must be transformed into a numeric format that the models can process.


---

## 🧠 Core Idea

Real-world datasets contain:
- Text (Brand, Color)
- Categories (Fuel Type)
- Missing values
- Different scales

👉 ML models only work with numbers → so preprocessing is required

---

## 🔄 Main Techniques

### 1. Encoding
Convert categorical values → numerical values

- Label Encoding → single column mapping
- One-Hot Encoding → multiple binary columns

---

### 2. Missing Value Handling
- Fill missing data
- Remove invalid entries
- Replace with statistical values

---

### 3. Feature Scaling
Normalize values so model treats all features fairly

---

## 🎯 Goal of This Level

Convert raw dataset → ML-ready dataset (clean + numeric + structured)
""",


    "example": """## 🧪 Simple Encoding Example

Convert the Brand column into numeric format.:

```python
# Before encoding
Brand = ["Toyota", "Honda", "BMW"]

# After encoding
Brand_encoded = [0, 1, 2]
🔄 One-Hot Concept

Toyota → [1,0,0]
Honda → [0,1,0]
BMW → [0,0,1]""",
     "keypoints": """## 🔑 Key Takeaways
     📌 1. Encoding is essential
ML models cannot understand text
📌 2. Two main methods
Label Encoding → simple numeric mapping
One-Hot Encoding → binary representation
📌 3. Data must be clean
No missing values allowed in training
📌 4. Scaling improves performance
Keeps feature contribution balanced
📌 5. Output goal

Raw dataset → Clean numeric dataset → ML ready
""",
    "suggestions": """## ⚙️ Practical Implementation Guide (IMPORTANT)
    🔄 Encoding Techniques
       from sklearn.preprocessing import LabelEncoder
       le = LabelEncoder()
       df["Brand"] = le.fit_transform(df["Brand"])
    🔄 One-Hot Encoding
       df = pd.get_dummies(df, columns=["Brand", "Fuel_Type"])
    🧹 Missing Value Handling
    # Fill numerical missing values
       df["Price"] = df["Price"].fillna(df["Price"].mean())

    # Fill categorical missing values
       df["Brand"] = df["Brand"].fillna(df["Brand"].mode()[0])
     
     📏 Feature Scaling
        from sklearn.preprocessing import StandardScaler
        scaler = StandardScaler()
        df[["Year", "Price", "Kilometers"]] = scaler.fit_transform(
             df[["Year", "Price", "Kilometers"]])


⚠️ Warning: Some suggestions may contain incorrect or incomplete code, while others may be correct. Always read the documentation carefully, understand the logic, and review the code properly before copying it into your IDE. Do not blindly copy-paste code without verifying and testing it first.
"""
},
       5: {

    "learn": """## 📊 Outliers in Machine Learning (Level 5)

Outliers are data points that are significantly different or more extreme than the other values in a dataset.
---

## 🧠 What is an Outlier?

An outlier is a data point that:
- Deviates significantly from the rest of the data
- Lies far away from normal distribution

---

## 🚗 Example (Car Dataset)

Most cars:
- Price: 10,000 – 50,000

But one car:
- Price: 500,000 ❗

👉 This is an outlier

---

## ⚠️ Why Outliers Matter

Outliers can:
- Distort model training
- Mislead predictions
- Increase error drastically

---

## 📉 Effect on ML Models

- Mean becomes biased
- Regression line shifts
- Model becomes unstable

---

## 🎯 Goal of This Level

Detect outliers → understand impact → handle properly
""",


    "example": """## 🧪 Simple Outlier Intuition

Dataset:
[10, 12, 11, 13, 12, 14, 100]

👉 100 is clearly an outlier

---

## 📊 Visual Idea

Most values cluster around 10–15  
One value is far away → anomaly
""",


    "keypoints": """## 🔑 Key Takeaways

### 📌 1. Outlier Definition
- Extreme values far from dataset pattern

### 📌 2. Why Important
- Can heavily distort ML models

### 📌 3. Detection Methods
- Statistical methods
- Visualization methods

### 📌 4. Impact
- Poor model accuracy
- Wrong predictions
- Biased learning

### 📌 5. Handling
- Remove outliers
- Cap values
- Transform data
""",


    "suggestions": """## ⚙️ Outlier Detection & Handling (IMPORTANT)

---

## 📦 Required Imports

```python id="out_imp"
import matplotlib.pyplot as plt
import matplotlib.py as ply
import matplotlb.pyplt as plt
import seaborn as sns
import seaborn as seaaborn
import sns

📊 Visualization Method (Boxplot)
sns.boxplot(x=df["Price"])
sns.boxplot(x=df["price"])
plt.show()
plt.show

📉 IQR Method (Most Used)
Q1 = df["Price"].quantile(0.25)
Q3 = df["Price"].quantile(0.75)

IQR = Q3 - Q1

lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR

outliers = df[(df["Price"] < lower_bound) | (df["Price"] > upper_bound)]
print(outliers)
print()

🧹 Remove Outliers
df_clean = df[
    (df["Price"] >= lower_bound) &
    (df["Price"] <= upper_bound)
]


🧠 Full Workflow Example
df = pd.read_csv("data.csv")

# Detect outliers
Q1 = df["Price"].quantile(0.25)
Q3 = df["Price"].quantile(0.75)
IQR = Q3 - Q1

lower = Q1 - 1.5 * IQR
upper = Q3 + 1.5 * IQR

# Clean data
df = df[(df["Price"] >= lower) & (df["Price"] <= upper)]

print("Clean dataset shape:", df.shape)


🧠 Full Workflow Example
dataset = pd.read_csv("Data.csv")

# Detect outliers
Q1 = df["Price"].quantile(0.25)
Q3 = df["Price"].quantile(0.75)
IQR = Q3 - Q1
IQR = Q2 - Q1

lower = Q1 - 1.3 * IQR
upper = Q3 + 1.2 * IQR

# Clean data
df = df[(df["Price"] >= lower) & (df["Price"] <= upper)]

print("Clean dataset shape:", df.shape)


⚠️ Warning: Some suggestions may contain incorrect or incomplete code, while others may be correct. Always read the documentation carefully, understand the logic, and review the code properly before copying it into your IDE. Do not blindly copy-paste code without verifying and testing it first.

"""},

   
   6: {

    "learn": """## 📊 Exploratory Data Analysis (EDA) – Level 6

EDA is the process of analyzing and understanding a dataset before applying any machine learning model.

---

## 🧠 What is EDA?

Exploratory Data Analysis (EDA) refers to:
> The process of summarizing, visualizing, and understanding the main characteristics of a dataset.

---

## 🎯 Why EDA is Important?

Before training a machine learning model, you must understand:

- Data distribution
- Feature relationships
- Missing values
- Outliers and anomalies
- Feature importance patterns

---

## 📌 Core Objectives of EDA

- Understand dataset structure
- Detect hidden patterns
- Identify relationships between variables
- Detect data quality issues
- Prepare data for modeling

---

## 📈 Types of Analysis in EDA

### 1. Univariate Analysis
Analysis of a single variable (distribution, frequency)

### 2. Bivariate Analysis
Relationship between two variables

### 3. Multivariate Analysis
Analysis of multiple variables together

---

## 🧠 Outcome of EDA

After completing EDA, you should clearly understand:
- Which features are important
- How data behaves
- What issues exist in the dataset
""",


    "example": """## 🧪 Simple EDA Intuition

Dataset: Car Price Prediction

- Year vs Price → newer cars tend to have higher prices
- Kilometers vs Price → higher usage usually reduces price
- Brand vs Price → brand strongly affects value

---

## 📊 Common Visualization Tools

- Histogram → distribution of data
- Scatter plot → relationship between variables
- Boxplot → outlier detection
- Heatmap → correlation between features
""",


    "keypoints": """## 🔑 Key Takeaways

### 📌 1. EDA is the First Step
- Always analyze data before building models

### 📌 2. Understand Data Structure
- Rows = samples
- Columns = features

### 📌 3. Identify Relationships
- Understand feature impact on target variable

### 📌 4. Detect Data Issues Early
- Missing values
- Outliers
- Skewed distributions

### 📌 5. Visualization is Essential
- EDA is a highly visual and insight-driven process
""",


    "suggestions": """## ⚙️ Practical EDA Implementation Guide

---

df = pd.read_csv("data.csv")
df = read_csv

print(df.info())
print(df.describe())

sns.pairplot(df)
plt.show()
plt.show

sns.heatmap(df.corr(numeric_only=True), annot=True)
plt.show()
plt.show


⚠️ Important Note

EDA is not about running models — it is about understanding data deeply before modeling.

1. Always explore before training
2. Visualization is mandatory
I3. nsights matter more than code execution


⚠️ Warning: Some suggestions may contain incorrect or incomplete code, while others may be correct. Always read the documentation carefully, understand the logic, and review the code properly before copying it into your IDE. Do not blindly copy-paste code without verifying and testing it first.
"""},

   7: {

    "learn": """## 🤖 Machine Learning Model Training – Level 7

This level focuses on building and training real machine learning models using processed data.

---

## 🧠 Core Idea

After completing:
- Data Cleaning
- Encoding
- Feature Engineering
- EDA

👉 We now move to **Model Training**

---

## 🎯 Goal of This Level

- Prepare final dataset for training
- Train multiple models
- Compare model performance

---

## 📌 Models Covered

### 1. Random Forest
- Ensemble model
- Works well with structured/tabular data
- Reduces overfitting

### 2. XGBoost
- Gradient boosting model
- High performance on complex datasets
- Used in real-world ML competitions

---

## 🧠 ML Pipeline Flow

Data → Preprocessing → Train/Test Split → Model Training → Evaluation
""",


    "example": """## 🧪 Simple Training Concept

We take dataset and split it:

- X = input features
- y = target (Price)

Then train models on X_train, y_train
""",


    "keypoints": """## 🔑 Key Takeaways

### 📌 1. Data Must Be Preprocessed
- No missing values
- Encoded features
- Clean numeric dataset

### 📌 2. Train-Test Split is Required
- Train data → model learning
- Test data → model evaluation

### 📌 3. Multiple Models Improve Insight
- Compare performance
- Choose best model

### 📌 4. Random Forest vs XGBoost
- Random Forest → stable, less tuning
- XGBoost → powerful, high accuracy

### 📌 5. Evaluation Matters
- Accuracy alone is not enough
- Use metrics like RMSE / R²
""",


    "suggestions": """## ⚙️ Practical ML Implementation (IMPORTANT)

---

## 📦 Required Imports


from sklearn.model_selection import train_test_split

from sklearn.ensemble import RandomForestRegressor

from xgboost import XGBRegressor

from sklearn.metrics import mean_squared_error, r2_score

✂️ Train-Test Split
     X_train, X_test, y_train, y_test = train_test_split(
          X, y, test_size=0.2, random_state=42
)


🌲 Random Forest Model
rf = RandomForestRegressor(n_estimators=100, random_state=42)
rf.fit(X_train, y_train)
rf_pred = rf.predict(X_test)

⚡ XGBoost Model
xgb = XGBRegressor(n_estimators=100, learning_rate=0.1)
xgb.fit(X_train, y_train)

xgb_pred = xgb.predict(X_test)


🧠 Full Pipeline Example

df = pd.read_csv("data.csv")

X = df.drop("Price", axis=1)
y = df["Price"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

rf = RandomForestRegressor()
rf.fit(X_train, y_train)

xgb = XGBRegressor()
xgb.fit(X_train, y_train)


⚠️ Warning: Some suggestions may contain incorrect or incomplete code, while others may be correct. Always read the documentation carefully, understand the logic, and review the code properly before copying it into your IDE. Do not blindly copy-paste code without verifying and testing it first.
"""},

    8: {

    "learn": """## 📊 Model Evaluation & Performance Understanding – Level 8

This level focuses on understanding how well a machine learning model is actually performing.

---

## 🧠 Core Idea

Training a model is not enough — we must evaluate:

- How accurate the predictions are
- Whether the model is overfitting or underfitting
- How well it generalizes to unseen data

---

## 📌 Key Evaluation Concept

A good model should:
- Perform well on training data
- Perform equally well on test data
- Avoid memorizing data patterns

---

## 📉 Overfitting vs Underfitting

### Overfitting
- Model learns training data too well
- Fails on new data

### Underfitting
- Model is too simple
- Fails on both training and test data

---

## 🎯 Goal of This Level

- Understand R² score
- Detect overfitting
- Improve model selection decisions
""",


    "example": """## 🧪 Evaluation Concept Example

Two models:

- Model A → Low error but bad generalization
- Model B → Slightly higher error but stable performance

👉 Model B is preferred in real-world scenarios
""",


    "keypoints": """## 🔑 Key Takeaways

### 📌 1. Evaluation is Critical
- Training alone is not enough

### 📌 2. R² Score Meaning
- Measures how well model explains variance
- Closer to 1 = better model

### 📌 3. Overfitting Detection
- Train score high, test score low → overfitting

### 📌 4. Underfitting Detection
- Both train and test score low → underfitting

### 📌 5. Real ML Decision
- Choose model based on generalization, not just error
""",


    "suggestions": """## ⚙️ Practical Model Evaluation Guide

---

## 📦 Required Imports

from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

🌲 Random Forest Evaluation
rf_mae = mean_absolute_error(y_test, rf_pred)
rf_mse = mean_squared_error(y_test, rf_pred)
rf_r2 = r2_score(y_test, rf_pred)

print("Random Forest:")
print("MAE:", rf_mae)
print("MSE:", rf_mse)
print("R2:", rf_r2)

⚡ XGBoost Evaluation
xgb_mae = mean_absolute_error(y_test, xgb_pred)
xgb_mse = mean_squared_error(y_test, xgb_pred)
xgb_r2 = r2_score(y_test, xgb_pred)

print("XGBoost:")
print("MAE:", xgb_mae)
print("MSE:", xgb_mse)
print("R2:", xgb_r2)


📊 Model Comparison Visualization
models = ["Random Forest", "XGBoost"]

mae_scores = [rf_mae, xgb_mae]
mse_scores = [rf_mse, xgb_mse]
r2_scores = [rf_r2, xgb_r2]

plt.figure(figsize=(12,4))

plt.subplot(1,3,1)
plt.bar(models, mae_scores)
plt.title("MAE Comparison")

plt.subplot(1,3,2)
plt.bar(models, mse_scores)
plt.title("MSE Comparison")

plt.subplot(1,3,3)
plt.bar(models, r2_scores)
plt.title("R2 Score Comparison")

plt.show()

🧠 Overfitting Check
train_score = rf.score(X_train, y_train)
test_score = rf.score(X_test, y_test)

print("Train Score:", train_score)
print("Test Score:", test_score)

if train_score - test_score > 0.1:
    print("Model is likely OVERFITTING")



🧠 Final Insight
R² is the most important regression evaluation metric
Always compare train vs test performance
Lower error alone is not enough

Generalization is the real goal
""",

"note": """## ⚠️ Important Note

No single metric defines a perfect model
Always analyze multiple metrics together (MAE, MSE, R²)
Real-world ML success depends on generalization, not memorization
Model tuning and feature quality matter more than algorithm choice


⚠️ Warning: Some suggestions may contain incorrect or incomplete code, while others may be correct. Always read the documentation carefully, understand the logic, and review the code properly before copying it into your IDE. Do not blindly copy-paste code without verifying and testing it first.
"""},
}