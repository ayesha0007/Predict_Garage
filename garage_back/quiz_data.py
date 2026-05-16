# Quiz data for each level

QUIZ_DATA = {
    1: [
        {
            'question': 'What is a dataset in machine learning?',
            'options': [
                'A collection of data with rows as observations and columns as features',
                'A single number used for calculation',
                'A type of machine learning algorithm',
                'A programming language for AI'
            ],
            'correct': 0
        },
        {
            'question': 'In car price prediction, what is the "target variable"?',
            'options': ['Car Brand', 'Car Price', 'Car Year', 'Fuel Type'],
            'correct': 1
        },
        {
            'question': 'Which of these is a CATEGORICAL feature for cars?',
            'options': ['Price', 'Kilometers', 'Year', 'Fuel Type'],
            'correct': 3
        },
        {
            'question': 'What makes a GOOD dataset for ML?',
            'options': [
                'Large and clean data with relevant features',
                'Any random data',
                'Very small dataset',
                'Only numerical data'
            ],
            'correct': 0
        },
        {
            'question': 'Why do we need to clean data before training?',
            'options': [
                'Remove errors and handle missing values',
                'Make dataset smaller',
                'Convert to images',
                'Delete all data'
            ],
            'correct': 0
        }
    ],
    
    2: [
        {
            'question': 'Minimum how many features should you select for a car price prediction model?',
            'options': ['At least 5', '1 feature', '2 features', '10 features'],
            'correct': 0
        },
        {
            'question': 'Which is the MOST important feature for car price prediction?',
            'options': ['Manufacturing Year', 'Car Color', 'Radio Type', 'Seat Material'],
            'correct': 0
        },
        {
            'question': 'What happens if you use too FEW features?',
            'options': ['Poor predictions', 'Better predictions', 'Faster training only', 'No effect'],
            'correct': 0
        },
        {
            'question': 'Which feature set is BEST for car price prediction?',
            'options': ['Year, Brand, Kilometers, Fuel Type', 'Only Brand', 'Only Year', 'Only Color'],
            'correct': 0
        },
        {
            'question': 'Why is "Manufacturing Year" important for price?',
            'options': ['Newer cars have higher value', 'It looks nice', 'Year determines color', 'No reason'],
            'correct': 0
        }
    ],
    
    3: [
        {
            'question': 'Which library is used for data manipulation?',
            'options': ['pandas', 'numpy', 'matplotlib', 'seaborn'],
            'correct': 0
        },
        {
            'question': 'How to import train_test_split?',
            'options': [
                'from sklearn.model_selection import train_test_split',
                'import train_test_split',
                'from sklearn import split',
                'import sklearn.split'
            ],
            'correct': 0
        },
        {
            'question': 'Which library for statistical graphics?',
            'options': ['seaborn', 'pandas', 'numpy', 'scikit-learn'],
            'correct': 0
        },
        {
            'question': 'What is alias for matplotlib.pyplot?',
            'options': ['plt', 'mp', 'plot', 'mpl'],
            'correct': 0
        },
        {
            'question': 'Which library for Linear Regression?',
            'options': ['sklearn.linear_model', 'pandas', 'numpy', 'matplotlib'],
            'correct': 0
        }
    ]
}

# Add more levels
for i in range(4, 9):
    QUIZ_DATA[i] = [
        {
            'question': f'Sample question for Level {i}?',
            'options': ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
            'correct': 0
        }
    ] * 5