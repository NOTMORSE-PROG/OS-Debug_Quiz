interface Question {
  id: number
  question: string
  code: string
  options: string[]
  correctAnswer: string
  explanation: string
}

const pythonQuestions: Question[] = [
  {
    id: 1,
    question: "What's wrong with this Python function?",
    code: `def calculate_average(numbers):
    total = 0
    for num in numbers:
        total += num
    return total / len(numbers)

# Test
result = calculate_average([])
print(result)`,
    options: [
      "Nothing is wrong",
      "Division by zero error when list is empty",
      "Variable 'total' is not defined",
      "Syntax error in the for loop",
    ],
    correctAnswer: "Division by zero error when list is empty",
    explanation: "When an empty list is passed, len(numbers) returns 0, causing division by zero.",
  },
  {
    id: 2,
    question: "Find the bug in this list comprehension:",
    code: `numbers = [1, 2, 3, 4, 5]
squared = [x^2 for x in numbers]
print(squared)`,
    options: [
      "Should use ** instead of ^ for exponentiation",
      "Missing parentheses around x^2",
      "Variable 'x' is not defined",
      "List comprehension syntax is incorrect",
    ],
    correctAnswer: "Should use ** instead of ^ for exponentiation",
    explanation: "In Python, ^ is the XOR operator, not exponentiation. Use ** for powers.",
  },
  {
    id: 3,
    question: "What's the issue with this dictionary access?",
    code: `student_grades = {'Alice': 85, 'Bob': 92}
print(student_grades['Charlie'])`,
    options: [
      "Dictionary syntax is wrong",
      "KeyError - 'Charlie' doesn't exist",
      "Should use parentheses instead of brackets",
      "Missing quotes around the key",
    ],
    correctAnswer: "KeyError - 'Charlie' doesn't exist",
    explanation: "Accessing a non-existent key raises a KeyError. Use .get() method or check if key exists.",
  },
  {
    id: 4,
    question: "Spot the indentation error:",
    code: `def greet(name):
print(f"Hello, {name}!")
    return "Done"`,
    options: [
      "Missing colon after function definition",
      "Print statement is not indented",
      "Return statement has wrong indentation",
      "f-string syntax is incorrect",
    ],
    correctAnswer: "Print statement is not indented",
    explanation: "In Python, code inside functions must be indented. The print statement should be indented.",
  },
  {
    id: 5,
    question: "What's wrong with this loop?",
    code: `for i in range(5):
    print(i)
    i += 1`,
    options: [
      "Cannot modify loop variable in for loop",
      "Range should start from 1",
      "Missing colon after for statement",
      "Print statement should be outside the loop",
    ],
    correctAnswer: "Cannot modify loop variable in for loop",
    explanation: "Modifying the loop variable (i) inside a for loop doesn't affect the iteration in Python.",
  },
  {
    id: 6,
    question: "Find the bug in this string operation:",
    code: `text = "Hello World"
text[0] = "h"
print(text)`,
    options: [
      "Strings are immutable in Python",
      "Index should start from 1",
      "Should use double quotes consistently",
      "Missing parentheses around assignment",
    ],
    correctAnswer: "Strings are immutable in Python",
    explanation: "Strings in Python are immutable. You cannot change individual characters by assignment.",
  },
  {
    id: 7,
    question: "What's the issue with this function call?",
    code: `def add_numbers(a, b, c):
    return a + b + c

result = add_numbers(1, 2)
print(result)`,
    options: [
      "Function definition is incorrect",
      "Missing third argument in function call",
      "Return statement syntax is wrong",
      "Variable names should be different",
    ],
    correctAnswer: "Missing third argument in function call",
    explanation: "The function expects 3 arguments but only 2 are provided, causing a TypeError.",
  },
  {
    id: 8,
    question: "Spot the error in this class definition:",
    code: `class Person:
    def __init__(self, name):
        self.name = name
    
    def greet():
        return f"Hello, I'm {self.name}"`,
    options: [
      "Missing 'self' parameter in greet method",
      "Class name should be lowercase",
      "__init__ method is incorrect",
      "f-string syntax is wrong",
    ],
    correctAnswer: "Missing 'self' parameter in greet method",
    explanation: "Instance methods in Python must have 'self' as the first parameter.",
  },
  {
    id: 9,
    question: "What's wrong with this file operation?",
    code: `file = open("data.txt", "r")
content = file.read()
print(content)`,
    options: [
      "File mode should be 'rb'",
      "File is not closed after reading",
      "Should use 'w' mode for reading",
      "Missing error handling",
    ],
    correctAnswer: "File is not closed after reading",
    explanation: "Files should be closed after use. Better to use 'with' statement for automatic closing.",
  },
  {
    id: 10,
    question: "Find the bug in this list operation:",
    code: `numbers = [1, 2, 3, 4, 5]
for i in numbers:
    if i % 2 == 0:
        numbers.remove(i)
print(numbers)`,
    options: [
      "Modifying list while iterating over it",
      "Modulo operator syntax is incorrect",
      "Should use 'del' instead of 'remove'",
      "Loop variable should be different",
    ],
    correctAnswer: "Modifying list while iterating over it",
    explanation: "Modifying a list while iterating can cause elements to be skipped or IndexError.",
  },
  {
    id: 11,
    question: "What's the issue with this variable scope?",
    code: `def increment():
    count += 1
    return count

count = 0
result = increment()
print(result)`,
    options: [
      "UnboundLocalError - count is not defined locally",
      "Function should return nothing",
      "Global variable syntax is wrong",
      "Missing parentheses in function call",
    ],
    correctAnswer: "UnboundLocalError - count is not defined locally",
    explanation: "Need to use 'global count' to modify global variable inside function.",
  },
  {
    id: 12,
    question: "Spot the error in this exception handling:",
    code: `try:
    result = 10 / 0
except:
    print("Error occurred")
finally
    print("Cleanup")`,
    options: [
      "Missing colon after 'finally'",
      "Should catch specific exception",
      "Try block is empty",
      "Finally block is optional",
    ],
    correctAnswer: "Missing colon after 'finally'",
    explanation: "Python requires a colon after 'finally' keyword, just like other control structures.",
  },
  {
    id: 13,
    question: "What's wrong with this import statement?",
    code: `import math
result = Math.sqrt(16)
print(result)`,
    options: [
      "Should use 'math.sqrt' instead of 'Math.sqrt'",
      "Import statement is incorrect",
      "sqrt function doesn't exist",
      "Should import sqrt specifically",
    ],
    correctAnswer: "Should use 'math.sqrt' instead of 'Math.sqrt'",
    explanation: "Python is case-sensitive. The module name is 'math' (lowercase), not 'Math'.",
  },
  {
    id: 14,
    question: "Find the bug in this lambda function:",
    code: `numbers = [1, 2, 3, 4, 5]
squared = map(lambda x: x ** 2, numbers)
print(squared[0])`,
    options: [
      "Lambda syntax is incorrect",
      "Map returns iterator, not list",
      "Should use list comprehension",
      "Exponentiation operator is wrong",
    ],
    correctAnswer: "Map returns iterator, not list",
    explanation: "map() returns an iterator. Use list(squared) or next(squared) to get values.",
  },
  {
    id: 15,
    question: "What's the issue with this boolean operation?",
    code: `x = 5
if x = 10:
    print("x is 10")
else:
    print("x is not 10")`,
    options: [
      "Should use '==' for comparison, not '='",
      "Missing parentheses around condition",
      "Else statement is unnecessary",
      "Variable x is not defined",
    ],
    correctAnswer: "Should use '==' for comparison, not '='",
    explanation: "Single '=' is assignment, double '==' is comparison in Python.",
  },
  {
    id: 16,
    question: "Spot the error in this tuple operation:",
    code: `coordinates = (3, 4)
coordinates[0] = 5
print(coordinates)`,
    options: [
      "Tuples are immutable in Python",
      "Index should start from 1",
      "Should use square brackets for tuples",
      "Assignment syntax is incorrect",
    ],
    correctAnswer: "Tuples are immutable in Python",
    explanation: "Tuples cannot be modified after creation. Use lists if you need mutability.",
  },
  {
    id: 17,
    question: "What's wrong with this set operation?",
    code: `numbers = {1, 2, 3, 4, 5}
print(numbers[0])`,
    options: [
      "Sets don't support indexing",
      "Should use parentheses for sets",
      "Index should be 1-based",
      "Set syntax is incorrect",
    ],
    correctAnswer: "Sets don't support indexing",
    explanation: "Sets are unordered collections and don't support indexing. Use iteration or conversion to list.",
  },
  {
    id: 18,
    question: "Find the bug in this recursive function:",
    code: `def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n)`,
    options: [
      "Should return factorial(n-1), not factorial(n)",
      "Base case is incorrect",
      "Missing return statement",
      "Function name is wrong",
    ],
    correctAnswer: "Should return factorial(n-1), not factorial(n)",
    explanation: "This creates infinite recursion. Should be factorial(n-1) to eventually reach base case.",
  },
  {
    id: 19,
    question: "What's the issue with this generator?",
    code: `def count_up():
    i = 0
    while True:
        return i
        i += 1

gen = count_up()
print(next(gen))`,
    options: [
      "Should use 'yield' instead of 'return'",
      "While loop condition is wrong",
      "Generator syntax is incorrect",
      "Missing parentheses in function call",
    ],
    correctAnswer: "Should use 'yield' instead of 'return'",
    explanation: "Generators use 'yield' to produce values. 'return' ends the function immediately.",
  },
  {
    id: 20,
    question: "Spot the error in this list slicing:",
    code: `numbers = [1, 2, 3, 4, 5]
subset = numbers[1:10]
print(len(subset))`,
    options: [
      "Nothing wrong - Python handles out-of-range gracefully",
      "Index 10 is out of range",
      "Should use parentheses for slicing",
      "Slice syntax is incorrect",
    ],
    correctAnswer: "Nothing wrong - Python handles out-of-range gracefully",
    explanation: "Python slicing is forgiving with out-of-range indices. This will return [2, 3, 4, 5].",
  },
]

const javaQuestions: Question[] = [
  {
    id: 1,
    question: "What's wrong with this Java method?",
    code: `public class Calculator {
    public int divide(int a, int b) {
        return a / b;
    }
}

// Usage
Calculator calc = new Calculator();
int result = calc.divide(10, 0);`,
    options: [
      "Method should be static",
      "Division by zero will throw ArithmeticException",
      "Return type should be double",
      "Missing access modifier",
    ],
    correctAnswer: "Division by zero will throw ArithmeticException",
    explanation: "Dividing by zero in Java throws an ArithmeticException at runtime.",
  },
  {
    id: 2,
    question: "Find the compilation error:",
    code: `public class Student {
    private String name;
    
    public Student(String name) {
        this.name = name;
    }
}

Student student = new Student();`,
    options: [
      "Missing default constructor",
      "Constructor should be private",
      "Class name should be lowercase",
      "Missing semicolon",
    ],
    correctAnswer: "Missing default constructor",
    explanation: "When you define a parameterized constructor, Java doesn't provide a default constructor.",
  },
  {
    id: 3,
    question: "What's the issue with this array access?",
    code: `int[] numbers = {1, 2, 3, 4, 5};
for (int i = 0; i <= numbers.length; i++) {
    System.out.println(numbers[i]);
}`,
    options: [
      "Array declaration syntax is wrong",
      "Loop condition causes ArrayIndexOutOfBoundsException",
      "Should use enhanced for loop",
      "Missing array initialization",
    ],
    correctAnswer: "Loop condition causes ArrayIndexOutOfBoundsException",
    explanation: "Array indices go from 0 to length-1. Using <= instead of < causes out-of-bounds access.",
  },
  {
    id: 4,
    question: "Spot the error in this string comparison:",
    code: `String str1 = "Hello";
String str2 = new String("Hello");
if (str1 == str2) {
    System.out.println("Strings are equal");
}`,
    options: [
      "Should use .equals() method for string comparison",
      "String declaration is incorrect",
      "Missing import statement",
      "Condition syntax is wrong",
    ],
    correctAnswer: "Should use .equals() method for string comparison",
    explanation: "== compares references, not content. Use .equals() to compare string values.",
  },
  {
    id: 5,
    question: "What's wrong with this method overriding?",
    code: `class Animal {
    public void makeSound() {
        System.out.println("Animal sound");
    }
}

class Dog extends Animal {
    private void makeSound() {
        System.out.println("Woof!");
    }
}`,
    options: [
      "Cannot reduce visibility when overriding",
      "Method name should be different",
      "Missing @Override annotation",
      "Class should be abstract",
    ],
    correctAnswer: "Cannot reduce visibility when overriding",
    explanation: "When overriding, you cannot reduce the visibility. Parent method is public, child cannot be private.",
  },
  {
    id: 6,
    question: "Find the bug in this exception handling:",
    code: `try {
    int result = Integer.parseInt("abc");
    System.out.println(result);
} catch (Exception e) {
    System.out.println("Error: " + e.getMessage());
} catch (NumberFormatException e) {
    System.out.println("Invalid number format");
}`,
    options: [
      "NumberFormatException catch block is unreachable",
      "Should use finally block",
      "Try block is empty",
      "Exception handling syntax is wrong",
    ],
    correctAnswer: "NumberFormatException catch block is unreachable",
    explanation:
      "More specific exceptions must be caught before general ones. NumberFormatException extends Exception.",
  },
  {
    id: 7,
    question: "What's the issue with this static method call?",
    code: `public class MathUtils {
    public int add(int a, int b) {
        return a + b;
    }
}

int result = MathUtils.add(5, 3);`,
    options: [
      "Method should be declared static",
      "Class should be instantiated first",
      "Method parameters are incorrect",
      "Return type should be void",
    ],
    correctAnswer: "Method should be declared static",
    explanation: "To call a method using class name, it must be declared static.",
  },
  {
    id: 8,
    question: "Spot the error in this interface implementation:",
    code: `interface Drawable {
    void draw();
}

class Circle implements Drawable {
    private void draw() {
        System.out.println("Drawing circle");
    }
}`,
    options: [
      "Interface method implementation must be public",
      "Interface should be abstract",
      "Method should be static",
      "Missing constructor",
    ],
    correctAnswer: "Interface method implementation must be public",
    explanation: "Interface methods are implicitly public, so implementations must also be public.",
  },
  {
    id: 9,
    question: "What's wrong with this variable initialization?",
    code: `public class Test {
    public static void main(String[] args) {
        int x;
        System.out.println(x);
    }
}`,
    options: [
      "Local variable must be initialized before use",
      "Variable should be static",
      "Wrong data type",
      "Missing access modifier",
    ],
    correctAnswer: "Local variable must be initialized before use",
    explanation: "Local variables in Java must be initialized before they can be used.",
  },
  {
    id: 10,
    question: "Find the bug in this loop:",
    code: `for (int i = 0; i < 10; i++) {
    if (i == 5) {
        continue;
    }
    if (i == 8) {
        break;
    }
    System.out.println(i);
}`,
    options: [
      "Nothing is wrong with this code",
      "Continue statement is misplaced",
      "Break statement should be outside if",
      "Loop variable should be final",
    ],
    correctAnswer: "Nothing is wrong with this code",
    explanation: "This code is correct. It will print 0,1,2,3,4,6,7 (skips 5, breaks at 8).",
  },
  {
    id: 11,
    question: "What's the issue with this constructor?",
    code: `public class Person {
    private String name;
    
    public void Person(String name) {
        this.name = name;
    }
}`,
    options: [
      "Constructor cannot have return type",
      "Constructor should be private",
      "Missing parameter validation",
      "Variable name conflict",
    ],
    correctAnswer: "Constructor cannot have return type",
    explanation: "Constructors should not have a return type, not even void. Remove 'void' keyword.",
  },
  {
    id: 12,
    question: "Spot the error in this method signature:",
    code: `public class Calculator {
    public static int add(int a, int b) {
        return a + b;
    }
    
    public static double add(int x, int y) {
        return x + y;
    }
}`,
    options: [
      "Method overloading error - same parameter types",
      "Static methods cannot be overloaded",
      "Return types are different",
      "Parameter names should be same",
    ],
    correctAnswer: "Method overloading error - same parameter types",
    explanation: "Method overloading requires different parameter types or count, not just different return types.",
  },
  {
    id: 13,
    question: "What's wrong with this abstract class?",
    code: `abstract class Shape {
    abstract void draw() {
        System.out.println("Drawing shape");
    }
}`,
    options: [
      "Abstract methods cannot have implementation",
      "Class should not be abstract",
      "Method should be public",
      "Missing constructor",
    ],
    correctAnswer: "Abstract methods cannot have implementation",
    explanation: "Abstract methods are declared without implementation. Remove the method body.",
  },
  {
    id: 14,
    question: "Find the bug in this switch statement:",
    code: `int day = 3;
switch (day) {
    case 1:
        System.out.println("Monday");
    case 2:
        System.out.println("Tuesday");
    case 3:
        System.out.println("Wednesday");
    default:
        System.out.println("Other day");
}`,
    options: [
      "Missing break statements cause fall-through",
      "Switch expression is invalid",
      "Case values should be strings",
      "Default case is misplaced",
    ],
    correctAnswer: "Missing break statements cause fall-through",
    explanation: "Without break statements, execution continues to subsequent cases (fall-through behavior).",
  },
  {
    id: 15,
    question: "What's the issue with this final variable?",
    code: `public class Constants {
    public static final int MAX_SIZE;
    
    static {
        MAX_SIZE = 100;
        MAX_SIZE = 200; // Later modification
    }
}`,
    options: [
      "Final variables cannot be reassigned",
      "Static block syntax is wrong",
      "Variable should be private",
      "Missing initialization",
    ],
    correctAnswer: "Final variables cannot be reassigned",
    explanation: "Final variables can only be assigned once. The second assignment to MAX_SIZE is illegal.",
  },
  {
    id: 16,
    question: "Spot the error in this generic class:",
    code: `public class Box<T> {
    private T item;
    
    public void setItem(T item) {
        this.item = item;
    }
    
    public T getItem() {
        return item;
    }
}

Box<int> intBox = new Box<int>();`,
    options: [
      "Cannot use primitive types with generics",
      "Generic syntax is incorrect",
      "Class should be abstract",
      "Methods should be static",
    ],
    correctAnswer: "Cannot use primitive types with generics",
    explanation: "Generics work only with reference types. Use Integer instead of int.",
  },
  {
    id: 17,
    question: "What's wrong with this method call?",
    code: `public class Test {
    public void method1() {
        method2();
    }
    
    public static void method2() {
        System.out.println("Method 2");
    }
    
    public static void main(String[] args) {
        method1();
    }
}`,
    options: [
      "Cannot call static method from instance method",
      "Cannot call instance method from static context",
      "Method visibility is wrong",
      "Missing return statement",
    ],
    correctAnswer: "Cannot call instance method from static context",
    explanation: "Static methods cannot directly call instance methods. Need to create an object first.",
  },
  {
    id: 18,
    question: "Find the bug in this inheritance:",
    code: `class Parent {
    private int value = 10;
}

class Child extends Parent {
    public void printValue() {
        System.out.println(value);
    }
}`,
    options: [
      "Private members are not inherited",
      "Class should be final",
      "Method should be static",
      "Missing constructor",
    ],
    correctAnswer: "Private members are not inherited",
    explanation: "Private members are not accessible in subclasses. Use protected or provide getter methods.",
  },
  {
    id: 19,
    question: "What's the issue with this null check?",
    code: `String text = null;
if (text.equals("Hello")) {
    System.out.println("Found Hello");
}`,
    options: [
      "NullPointerException when calling equals on null",
      "String comparison syntax is wrong",
      "Should use == for comparison",
      "Missing else clause",
    ],
    correctAnswer: "NullPointerException when calling equals on null",
    explanation: "Calling methods on null references throws NullPointerException. Check for null first.",
  },
  {
    id: 20,
    question: "Spot the error in this enum:",
    code: `public enum Color {
    RED, GREEN, BLUE;
    
    public Color() {
        System.out.println("Color created");
    }
}`,
    options: [
      "Enum constructor must be private",
      "Enum cannot have constructor",
      "Missing semicolon after values",
      "Constructor should be static",
    ],
    correctAnswer: "Enum constructor must be private",
    explanation: "Enum constructors are implicitly private and cannot be declared public or protected.",
  },
]

const htmlQuestions: Question[] = [
  {
    id: 1,
    question: "What's wrong with this HTML structure?",
    code: `<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
<body>
    <h1>Welcome</h1>
    <p>Hello World</p>
</body>
</html>`,
    options: [
      "Missing closing </head> tag",
      "DOCTYPE declaration is incorrect",
      "Body should be inside head",
      "Missing meta charset",
    ],
    correctAnswer: "Missing closing </head> tag",
    explanation: "The <head> section is not properly closed before the <body> tag starts.",
  },
  {
    id: 2,
    question: "Find the error in this form element:",
    code: `<form>
    <label for="username">Username:</label>
    <input type="text" id="user" name="username">
    <input type="submit" value="Submit">
</form>`,
    options: [
      "Label 'for' attribute doesn't match input 'id'",
      "Form action is missing",
      "Input type should be 'textbox'",
      "Submit button syntax is wrong",
    ],
    correctAnswer: "Label 'for' attribute doesn't match input 'id'",
    explanation: "The label's 'for' attribute should match the input's 'id' attribute for proper association.",
  },
  {
    id: 3,
    question: "What's the issue with this image tag?",
    code: `<img src="photo.jpg" width="200" height="150">`,
    options: [
      "Missing alt attribute for accessibility",
      "Width and height should use CSS",
      "Image source path is incorrect",
      "Missing closing tag",
    ],
    correctAnswer: "Missing alt attribute for accessibility",
    explanation: "Images should always have an alt attribute for screen readers and accessibility.",
  },
  {
    id: 4,
    question: "Spot the error in this table structure:",
    code: `<table>
    <tr>
        <th>Name</th>
        <th>Age</th>
    </tr>
    <td>John</td>
    <td>25</td>
</table>`,
    options: [
      "Table data cells must be inside <tr> tags",
      "Missing table caption",
      "Header cells should use <td>",
      "Table needs a border attribute",
    ],
    correctAnswer: "Table data cells must be inside <tr> tags",
    explanation: "All <td> elements must be contained within <tr> (table row) elements.",
  },
  {
    id: 5,
    question: "What's wrong with this list structure?",
    code: `<ul>
    <li>Item 1</li>
    <p>This is a paragraph</p>
    <li>Item 2</li>
</ul>`,
    options: [
      "Only <li> elements allowed directly inside <ul>",
      "List should use <ol> instead",
      "Missing list-style-type",
      "Paragraph tag is not closed",
    ],
    correctAnswer: "Only <li> elements allowed directly inside <ul>",
    explanation: "Unordered lists can only contain <li> elements as direct children.",
  },
  {
    id: 6,
    question: "Find the bug in this link tag:",
    code: `<a href="https://example.com" target="_blank">
    Visit Example
</a>`,
    options: [
      "Missing rel='noopener' for security",
      "Target attribute value is incorrect",
      "Href should use http instead of https",
      "Link text should be in quotes",
    ],
    correctAnswer: "Missing rel='noopener' for security",
    explanation: "Links with target='_blank' should include rel='noopener' to prevent security vulnerabilities.",
  },
  {
    id: 7,
    question: "What's the issue with this meta tag?",
    code: `<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <title>My Page</title>
</head>`,
    options: [
      "Missing initial-scale=1.0 in viewport meta",
      "Charset should be ISO-8859-1",
      "Meta tags should be after title",
      "Viewport meta is unnecessary",
    ],
    correctAnswer: "Missing initial-scale=1.0 in viewport meta",
    explanation: "Viewport meta tag should include initial-scale=1.0 for proper mobile rendering.",
  },
  {
    id: 8,
    question: "Spot the error in this input validation:",
    code: `<form>
    <input type="email" required>
    <input type="password" minlength="8">
    <input type="submit" value="Submit">
</form>`,
    options: [
      "Nothing is wrong with this code",
      "Email input needs pattern attribute",
      "Password should use maxlength instead",
      "Form needs method attribute",
    ],
    correctAnswer: "Nothing is wrong with this code",
    explanation: "This HTML5 form validation is correct. The browser will handle email validation and password length.",
  },
  {
    id: 9,
    question: "What's wrong with this semantic HTML?",
    code: `<div class="header">
    <div class="nav">
        <a href="#home">Home</a>
        <a href="#about">About</a>
    </div>
</div>
<div class="main-content">
    <h1>Welcome</h1>
</div>`,
    options: [
      "Should use semantic tags like <header>, <nav>, <main>",
      "Class names are incorrect",
      "Missing DOCTYPE declaration",
      "Div elements are not allowed",
    ],
    correctAnswer: "Should use semantic tags like <header>, <nav>, <main>",
    explanation: "HTML5 provides semantic elements that are more meaningful than generic div elements.",
  },
  {
    id: 10,
    question: "Find the bug in this script tag:",
    code: `<script type="text/javascript" src="script.js">
    console.log("Hello World");
</script>`,
    options: [
      "Cannot have both src attribute and inline content",
      "Script type is unnecessary in HTML5",
      "Console.log syntax is incorrect",
      "Script should be in head section",
    ],
    correctAnswer: "Cannot have both src attribute and inline content",
    explanation: "Script tags with src attribute cannot contain inline JavaScript code.",
  },
  {
    id: 11,
    question: "What's the issue with this button element?",
    code: `<button onclick="submitForm()">
    <a href="submit.php">Submit</a>
</button>`,
    options: [
      "Cannot nest interactive elements (button and link)",
      "Onclick attribute syntax is wrong",
      "Button should use type attribute",
      "Link href is incorrect",
    ],
    correctAnswer: "Cannot nest interactive elements (button and link)",
    explanation: "Interactive elements like buttons and links cannot be nested inside each other.",
  },
  {
    id: 12,
    question: "Spot the error in this media query:",
    code: `<style>
@media screen and (max-width: 600px) {
    .container {
        width: 100%;
    }
}
</style>`,
    options: [
      "Nothing is wrong with this CSS",
      "Media query syntax is incorrect",
      "Should use min-width instead",
      "Missing media type",
    ],
    correctAnswer: "Nothing is wrong with this CSS",
    explanation: "This is a correctly formatted CSS media query for responsive design.",
  },
  {
    id: 13,
    question: "What's wrong with this HTML5 video element?",
    code: `<video width="320" height="240">
    <source src="movie.mp4" type="video/mp4">
    Your browser does not support the video tag.
</video>`,
    options: [
      "Missing controls attribute for user interaction",
      "Video dimensions should use CSS",
      "Source type is incorrect",
      "Fallback text is unnecessary",
    ],
    correctAnswer: "Missing controls attribute for user interaction",
    explanation: "Video elements should include controls attribute to allow users to play, pause, and control volume.",
  },
  {
    id: 14,
    question: "Find the bug in this form validation:",
    code: `<form>
    <input type="text" pattern="[0-9]{3}" title="Enter 3 digits">
    <input type="submit" value="Submit">
</form>`,
    options: [
      "Pattern should be [0-9]{3,3}",
      "Missing required attribute",
      "Title attribute should be placeholder",
      "Nothing is wrong",
    ],
    correctAnswer: "Nothing is wrong",
    explanation: "This pattern correctly validates exactly 3 digits, and title provides helpful user feedback.",
  },
  {
    id: 15,
    question: "What's the issue with this DOCTYPE?",
    code: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html>
<head>
    <meta charset="UTF-8">
    <title>My Page</title>
</head>
</html>`,
    options: [
      "Using HTML4 DOCTYPE with HTML5 features",
      "DOCTYPE should be lowercase",
      "Missing URL in DOCTYPE",
      "Charset meta not supported in HTML4",
    ],
    correctAnswer: "Using HTML4 DOCTYPE with HTML5 features",
    explanation: "The charset meta tag is HTML5 syntax but the DOCTYPE declares HTML 4.01.",
  },
  {
    id: 16,
    question: "Spot the error in this fieldset:",
    code: `<form>
    <fieldset>
        <legend>Personal Information</legend>
        <input type="text" placeholder="Name">
        <input type="email" placeholder="Email">
    </fieldset>
</form>`,
    options: [
      "Nothing is wrong with this code",
      "Legend should be outside fieldset",
      "Fieldset needs a name attribute",
      "Inputs need labels for accessibility",
    ],
    correctAnswer: "Inputs need labels for accessibility",
    explanation:
      "While the fieldset structure is correct, form inputs should have associated labels for accessibility.",
  },
  {
    id: 17,
    question: "What's wrong with this CSS link?",
    code: `<head>
    <link rel="stylesheet" href="styles.css" type="text/css">
</head>`,
    options: [
      "Type attribute is unnecessary in HTML5",
      "Rel attribute value is incorrect",
      "Link should be in body section",
      "Missing media attribute",
    ],
    correctAnswer: "Type attribute is unnecessary in HTML5",
    explanation: "In HTML5, the type attribute for CSS stylesheets is optional and can be omitted.",
  },
  {
    id: 18,
    question: "Find the bug in this canvas element:",
    code: `<canvas id="myCanvas" width="200" height="100">
    <p>Your browser doesn't support canvas.</p>
</canvas>
<script>
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
</script>`,
    options: [
      "Nothing is wrong with this code",
      "Canvas dimensions should use CSS",
      "Script should be before canvas",
      "Missing canvas type attribute",
    ],
    correctAnswer: "Nothing is wrong with this code",
    explanation: "This is correct HTML5 canvas implementation with proper fallback content and JavaScript.",
  },
  {
    id: 19,
    question: "What's the issue with this heading structure?",
    code: `<h1>Main Title</h1>
<h3>Subsection</h3>
<h2>Section Title</h2>
<h4>Sub-subsection</h4>`,
    options: [
      "Heading levels should be sequential (h1, h2, h3, h4)",
      "Too many heading levels",
      "Headings should use CSS classes",
      "Missing section elements",
    ],
    correctAnswer: "Heading levels should be sequential (h1, h2, h3, h4)",
    explanation:
      "Heading levels should follow a logical hierarchy without skipping levels for proper document structure.",
  },
  {
    id: 20,
    question: "Spot the error in this data attribute:",
    code: `<div data-user-id="123" data-user name="John">
    User Information
</div>`,
    options: [
      "Data attribute names cannot contain spaces",
      "Data attributes should use camelCase",
      "Missing quotes around attribute values",
      "Too many data attributes",
    ],
    correctAnswer: "Data attribute names cannot contain spaces",
    explanation:
      "Data attribute names must be valid HTML attribute names and cannot contain spaces. Use hyphens instead.",
  },
]

const cssQuestions: Question[] = [
  {
    id: 1,
    question: "What's wrong with this CSS selector?",
    code: `.container > .item {
    color: red;
    background-color: blue
    font-size: 16px;
}`,
    options: [
      "Missing semicolon after background-color",
      "Selector syntax is incorrect",
      "Color values should be in quotes",
      "Font-size unit is missing",
    ],
    correctAnswer: "Missing semicolon after background-color",
    explanation:
      "CSS properties must end with semicolons. Missing semicolon can cause subsequent properties to be ignored.",
  },
  {
    id: 2,
    question: "Find the bug in this flexbox layout:",
    code: `.container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
}`,
    options: [
      "Duplicate justify-content property (last one wins)",
      "Cannot use justify-content with flex-direction column",
      "Missing flex-wrap property",
      "Align-items should be align-content",
    ],
    correctAnswer: "Duplicate justify-content property (last one wins)",
    explanation: "When the same property is declared twice, the last declaration overrides the first one.",
  },
  {
    id: 3,
    question: "What's the issue with this positioning?",
    code: `.element {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 100px;
}`,
    options: [
      "Element won't be perfectly centered",
      "Position value is incorrect",
      "Width and height are required",
      "Missing z-index property",
    ],
    correctAnswer: "Element won't be perfectly centered",
    explanation:
      "This positions the top-left corner at center. Use transform: translate(-50%, -50%) for true centering.",
  },
  {
    id: 4,
    question: "Spot the error in this media query:",
    code: `@media screen and max-width: 768px {
    .container {
        width: 100%;
    }
}`,
    options: [
      "Missing parentheses around condition",
      "Should use 'or' instead of 'and'",
      "Media type should be 'all'",
      "Width value needs units",
    ],
    correctAnswer: "Missing parentheses around condition",
    explanation: "Media query conditions must be wrapped in parentheses: (max-width: 768px).",
  },
  {
    id: 5,
    question: "What's wrong with this CSS grid?",
    code: `.grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;
    gap: 20px;
    grid-column-gap: 10px;
}`,
    options: [
      "Conflicting gap properties (gap overrides grid-column-gap)",
      "Grid-template-rows should have multiple values",
      "Fr units cannot be used with auto",
      "Missing grid-area property",
    ],
    correctAnswer: "Conflicting gap properties (gap overrides grid-column-gap)",
    explanation:
      "The 'gap' shorthand property overrides individual gap properties. Use either gap or specific gap properties.",
  },
  {
    id: 6,
    question: "Find the bug in this animation:",
    code: `@keyframes slideIn {
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(0);
    }
}

.element {
    animation: slideIn 2s ease-in-out;
    animation-fill-mode: forwards;
}`,
    options: [
      "Nothing is wrong with this code",
      "Keyframes should use 0% and 100%",
      "Animation duration should be in milliseconds",
      "Transform property is not animatable",
    ],
    correctAnswer: "Nothing is wrong with this code",
    explanation: "This is a correctly implemented CSS animation with proper keyframes and animation properties.",
  },
  {
    id: 7,
    question: "What's the issue with this box model?",
    code: `.box {
    width: 200px;
    height: 100px;
    padding: 20px;
    border: 5px solid black;
    box-sizing: content-box;
}`,
    options: [
      "Total width will be 250px (200 + 20*2 + 5*2)",
      "Box-sizing should be border-box",
      "Padding cannot be used with width",
      "Border syntax is incorrect",
    ],
    correctAnswer: "Total width will be 250px (200 + 20*2 + 5*2)",
    explanation: "With content-box, padding and border are added to the specified width, making total width larger.",
  },
  {
    id: 8,
    question: "Spot the error in this pseudo-selector:",
    code: `.menu li:nth-child(2n+1) {
    background-color: #f0f0f0;
}

.menu li::first-child {
    font-weight: bold;
}`,
    options: [
      "Should use :first-child instead of ::first-child",
      "Nth-child formula is incorrect",
      "Pseudo-selectors cannot be combined",
      "Background-color value is invalid",
    ],
    correctAnswer: "Should use :first-child instead of ::first-child",
    explanation: "::first-child is incorrect syntax. Use :first-child (single colon) for pseudo-classes.",
  },
  {
    id: 9,
    question: "What's wrong with this CSS variable?",
    code: `:root {
    --primary-color: #3498db;
    --secondary-color: var(--primary-color);
}

.element {
    color: var(--primary color);
    background: var(--secondary-color);
}`,
    options: [
      "Space in variable name '--primary color'",
      "Cannot use variables inside variables",
      "Variables should be declared in body",
      "Variable syntax is incorrect",
    ],
    correctAnswer: "Space in variable name '--primary color'",
    explanation: "CSS custom property names cannot contain spaces. Use hyphens or underscores instead.",
  },
  {
    id: 10,
    question: "Find the bug in this transition:",
    code: `.button {
    background-color: blue;
    transition: all 0.3s ease;
}

.button:hover {
    background-color: red;
    transform: scale(1.1);
    transition: transform 0.5s ease;
}`,
    options: [
      "Transition in :hover overrides base transition",
      "Cannot transition 'all' properties",
      "Transform scale value is too high",
      "Transition timing is inconsistent",
    ],
    correctAnswer: "Transition in :hover overrides base transition",
    explanation:
      "Transitions should be defined on the base element, not in pseudo-classes, to work in both directions.",
  },
  {
    id: 11,
    question: "What's the issue with this z-index?",
    code: `.element1 {
    position: static;
    z-index: 10;
}

.element2 {
    position: relative;
    z-index: 5;
}`,
    options: [
      "Z-index only works with positioned elements",
      "Z-index values should be negative",
      "Position static is not valid",
      "Z-index needs units",
    ],
    correctAnswer: "Z-index only works with positioned elements",
    explanation:
      "Z-index only applies to positioned elements (relative, absolute, fixed, sticky), not static elements.",
  },
  {
    id: 12,
    question: "Spot the error in this calc() function:",
    code: `.container {
    width: calc(100% - 20px + 10px);
    height: calc(100vh-50px);
    margin: calc(10px * 2);
}`,
    options: [
      "Missing spaces around operators in height calc",
      "Cannot mix units in calc",
      "Calc function syntax is wrong",
      "Too many operations in one calc",
    ],
    correctAnswer: "Missing spaces around operators in height calc",
    explanation: "CSS calc() function requires spaces around + and - operators for proper parsing.",
  },
  {
    id: 13,
    question: "What's wrong with this CSS specificity?",
    code: `#header .nav ul li a {
    color: blue;
}

.nav-link {
    color: red !important;
}

a {
    color: green;
}`,
    options: [
      "!important overrides all other declarations",
      "ID selector has highest specificity",
      "Class selector should come last",
      "Element selector is too generic",
    ],
    correctAnswer: "!important overrides all other declarations",
    explanation: "!important declarations override normal specificity rules and should be used sparingly.",
  },
  {
    id: 14,
    question: "Find the bug in this CSS reset:",
    code: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

*, *::before, *::after {
    box-sizing: inherit;
}`,
    options: [
      "Conflicting box-sizing declarations",
      "Universal selector is too broad",
      "Should use normalize.css instead",
      "Pseudo-elements syntax is wrong",
    ],
    correctAnswer: "Conflicting box-sizing declarations",
    explanation: "First rule sets box-sizing to border-box, second sets it to inherit, creating a conflict.",
  },
  {
    id: 15,
    question: "What's the issue with this font declaration?",
    code: `.text {
    font-family: "Times New Roman", serif;
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
    line-height: 1.5;
    font: 18px/1.6 Arial, sans-serif;
}`,
    options: [
      "Font shorthand overrides individual properties",
      "Font-weight should be 'normal' not 400",
      "Line-height syntax is incorrect",
      "Cannot mix serif and sans-serif fonts",
    ],
    correctAnswer: "Font shorthand overrides individual properties",
    explanation: "The font shorthand property resets and overrides all individual font properties declared before it.",
  },
  {
    id: 16,
    question: "Spot the error in this CSS import:",
    code: `body {
    background-color: white;
}

@import url('fonts.css');

.container {
    max-width: 1200px;
}`,
    options: [
      "@import must be at the beginning of CSS file",
      "Import URL syntax is incorrect",
      "Should use link tag instead of @import",
      "Missing media query in import",
    ],
    correctAnswer: "@import must be at the beginning of CSS file",
    explanation: "@import rules must come before all other CSS rules except @charset declarations.",
  },
  {
    id: 17,
    question: "What's wrong with this gradient?",
    code: `.element {
    background: linear-gradient(45deg, red, blue, green);
    background: -webkit-linear-gradient(45deg, red, blue, green);
    background: -moz-linear-gradient(45deg, red, blue, green);
}`,
    options: [
      "Standard syntax should come last",
      "Gradient angle is incorrect",
      "Too many color stops",
      "Vendor prefixes are unnecessary",
    ],
    correctAnswer: "Standard syntax should come last",
    explanation:
      "When using vendor prefixes, the standard syntax should be declared last to override prefixed versions.",
  },
  {
    id: 18,
    question: "Find the bug in this CSS counter:",
    code: `.list {
    counter-reset: item;
}

.list li {
    counter-increment: item;
}

.list li::before {
    content: counter(item) ". ";
}`,
    options: [
      "Nothing is wrong with this code",
      "Counter-reset should be on li elements",
      "Content property syntax is incorrect",
      "Should use counter() instead of counters()",
    ],
    correctAnswer: "Nothing is wrong with this code",
    explanation: "This is a correctly implemented CSS counter for custom list numbering.",
  },
  {
    id: 19,
    question: "What's the issue with this CSS filter?",
    code: `.image {
    filter: blur(5px) brightness(1.2) contrast(110%);
    -webkit-filter: blur(5px) brightness(1.2) contrast(110%);
}`,
    options: [
      "Contrast value should be decimal (1.1) not percentage",
      "Filter functions cannot be chained",
      "Webkit prefix should come after standard",
      "Blur value needs different units",
    ],
    correctAnswer: "Contrast value should be decimal (1.1) not percentage",
    explanation: "CSS filter contrast() function expects decimal values (1.0 = 100%), not percentage values.",
  },
  {
    id: 20,
    question: "Spot the error in this CSS custom property:",
    code: `:root {
    --main-bg-color: #ffffff;
}

.element {
    background-color: var(--main-bg-color, #000000);
    color: var(--text-color);
}`,
    options: [
      "Missing fallback value for --text-color",
      "Custom property names should be camelCase",
      "Fallback syntax is incorrect",
      "Variables should be declared in * selector",
    ],
    correctAnswer: "Missing fallback value for --text-color",
    explanation:
      "When using undefined custom properties, it's good practice to provide fallback values to prevent rendering issues.",
  },
]

export function getRandomQuestions(language: string, count: number): Question[] {
  let questions: Question[] = []

  switch (language.toLowerCase()) {
    case "python":
      questions = pythonQuestions
      break
    case "java":
      questions = javaQuestions
      break
    case "html":
      questions = htmlQuestions
      break
    case "css":
      questions = cssQuestions
      break
    default:
      questions = pythonQuestions
  }

  // Shuffle array and return specified count
  const shuffled = [...questions].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}
