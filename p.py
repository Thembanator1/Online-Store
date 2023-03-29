import numpy as np
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import confusion_matrix

# Read the data
with open('C:\Users\aluzu\Downloads\simple-food-reviews (1).txt', 'r') as f:
    data = [line.strip().split(' ', 1) for line in f.readlines()]

# Split the data into training and test sets
np.random.shuffle(data)
train_data = data[:12]
test_data = data[12:]

# Extract the features and labels from the training data
train_features = []
train_labels = []
for label, text in train_data:
    train_features.append(text.split())
    train_labels.append(int(label))

# Extract the features and labels from the test data
test_features = []
test_labels = []
for label, text in test_data:
    test_features.append(text.split())
    test_labels.append(int(label))

# Create a bag-of-words representation of the data
from sklearn.feature_extraction.text import CountVectorizer
vectorizer = CountVectorizer()
train_features = vectorizer.fit_transform([' '.join(tokens) for tokens in train_features])
test_features = vectorizer.transform([' '.join(tokens) for tokens in test_features])

# Train a Naive Bayes classifier with Laplace smoothing
clf = MultinomialNB(alpha=1)
clf.fit(train_features, train_labels)

# Make predictions on the test set
predictions = clf.predict(test_features)

# Calculate the confusion matrix
cm = confusion_matrix(test_labels, predictions)
print(cm)
