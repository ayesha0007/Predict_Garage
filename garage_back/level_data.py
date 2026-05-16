# Level content data for AutoML Quest - Car Price Prediction

LEVEL_CONTENT = {
    1: {
        "learn": """## 📊 What is a Dataset?

A **dataset** is a collection of data used to train machine learning models.

### Key Concepts:
- **Rows** = Individual observations (each car)
- **Columns** = Features (characteristics of each car)
- **Target Variable** = What we want to predict (Car Price)

### For Car Price Prediction:
- **Features**: Brand, Year, Fuel Type, Kilometers Driven, Engine Size
- **Target**: Price (in dollars or taka)

### Data Types:
- **Numerical**: Year, Kilometers, Price
- **Categorical**: Brand, Fuel Type, Color

### Why Data Quality Matters:
- Clean data = Good predictions
- Missing values = Bad predictions
- Relevant features = Accurate model""",

        "example": """## 📝 Example Dataset Structure

| Brand   | Year | Fuel Type | Kilometers | Price ($) |
|---------|------|-----------|------------|-----------|
| Toyota  | 2020 | Petrol    | 30000      | 22000     |
| Honda   | 2019 | Diesel    | 45000      | 18500     |
| BMW     | 2021 | Petrol    | 15000      | 35000     |
| Mercedes| 2018 | Diesel    | 60000      | 28000     |

### Explanation:
- Each row = One car
- Columns = Features
- Last column = Target (Price)""",

        "keypoints": """## 🔑 Key Takeaways

1. Dataset = Rows + Columns
2. Features = Input, Target = Output
3. Good dataset needs:
   - Enough data (100+ rows)
   - Clean values
   - Relevant features
4. Avoid:
   - Missing values
   - Duplicate data
   - Irrelevant features"""
    },

    2: {
        "learn": """## 🏗️ Building Your Dataset

### Must-Have Features:
1. Brand
2. Year
3. Fuel Type
4. Kilometers Driven
5. Engine Size

### Optional Features:
- Transmission
- Owner Type
- Mileage
- Seats
- Color

👉 Minimum 5 features required""",

        "example": """## 🎯 Feature Selection Example

Good:
- Year
- Brand
- Kilometers
- Fuel Type
- Engine CC

Bad:
- Only Brand + Price ❌ (too weak model)""",

        "keypoints": """## 💡 Tips

- 5 good features > 20 useless features
- Year is very important
- Avoid duplicate features
- Use domain knowledge"""
    },

    3: {
        "learn": """## 📚 Python ML Libraries

### Core Libraries:

- pandas → data handling
- numpy → math operations
- matplotlib → plotting
- seaborn → advanced visualization
- sklearn → machine learning models

### Standard Import:
```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
```""",

        "example": """## 📖 Example Setup

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

sns.set_style("darkgrid")
plt.rcParams['figure.figsize'] = (12, 6)
```""",

        "keypoints": """## 🔑 Key Points

- Always import at top
- Use aliases: pd, np, plt, sns
- sklearn = ML brain
- Visualization helps understanding"""
    }
}