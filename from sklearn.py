from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import confusion_matrix

# Load the data
with open(r'C:\Users\aluzu\Downloads\simple-food-reviews (1).txt') as f:
    lines = f.readlines()

# Split the data into training and test sets
train_lines = lines[:12]
test_lines = lines[12:]

# Create the training set
train_X = [line.split()[1:] for line in train_lines]
train_y = [int(line.split()[0]) for line in train_lines]

# Create the test set
test_X = [line.split()[1:] for line in test_lines]
test_y = [int(line.split()[0]) for line in test_lines]

# Train the Naive Bayes model on the training set
clf = MultinomialNB(alpha=1.0, fit_prior=True)
clf.fit(train_X, train_y)

# Make predictions on the test set
pred_y = clf.predict(test_X)

# Create the confusion matrix
conf_mat = confusion_matrix(test_y, pred_y)
print(conf_mat)
