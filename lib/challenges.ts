interface Challenge {
  id: number
  description: string
  brokenCode: string
  correctCode: string
  expectedOutput: string
  currentOutput: string
  hint: string
}

const pythonChallenges: Challenge[] = [
  {
    id: 1,
    description: "Fix the missing semicolon and print statement syntax",
    brokenCode: `name = "Alice"
print("Hello, " + name`,
    correctCode: `name = "Alice"
print("Hello, " + name)`,
    expectedOutput: "Hello, Alice",
    currentOutput: "SyntaxError: unexpected EOF while parsing",
    hint: "Check for missing closing parenthesis in the print statement",
  },
  {
    id: 2,
    description: "Fix the indentation error in the if statement",
    brokenCode: `age = 18
if age >= 18:
print("You can vote!")`,
    correctCode: `age = 18
if age >= 18:
    print("You can vote!")`,
    expectedOutput: "You can vote!",
    currentOutput: "IndentationError: expected an indented block",
    hint: "Python requires proper indentation for code blocks",
  },
  {
    id: 3,
    description: "Fix the variable name and string quotes",
    brokenCode: `user_name = 'John'
print("Welcome, " + userName + "!")`,
    correctCode: `user_name = 'John'
print("Welcome, " + user_name + "!")`,
    expectedOutput: "Welcome, John!",
    currentOutput: "NameError: name 'userName' is not defined",
    hint: "Check the variable name - Python is case sensitive",
  },
  {
    id: 4,
    description: "Fix the list indexing error",
    brokenCode: `numbers = [1, 2, 3]
print(numbers[3])`,
    correctCode: `numbers = [1, 2, 3]
print(numbers[2])`,
    expectedOutput: "3",
    currentOutput: "IndexError: list index out of range",
    hint: "Remember that list indices start from 0",
  },
  {
    id: 5,
    description: "Fix the function definition and call",
    brokenCode: `def greet(name)
    return "Hello, " + name

print(greet("Bob"))`,
    correctCode: `def greet(name):
    return "Hello, " + name

print(greet("Bob"))`,
    expectedOutput: "Hello, Bob",
    currentOutput: "SyntaxError: invalid syntax",
    hint: "Function definitions need a colon at the end",
  },
  {
    id: 6,
    description: "Fix the dictionary key access",
    brokenCode: `person = {"name": "Alice", "age": 25}
print(person[name])`,
    correctCode: `person = {"name": "Alice", "age": 25}
print(person["name"])`,
    expectedOutput: "Alice",
    currentOutput: "NameError: name 'name' is not defined",
    hint: "Dictionary keys should be in quotes when accessing",
  },
  {
    id: 7,
    description: "Fix the for loop syntax",
    brokenCode: `for i in range(3)
    print(i)`,
    correctCode: `for i in range(3):
    print(i)`,
    expectedOutput: "0\n1\n2",
    currentOutput: "SyntaxError: invalid syntax",
    hint: "For loops need a colon at the end",
  },
  {
    id: 8,
    description: "Fix the string concatenation",
    brokenCode: `age = 25
print("I am " + age + " years old")`,
    correctCode: `age = 25
print("I am " + str(age) + " years old")`,
    expectedOutput: "I am 25 years old",
    currentOutput: 'TypeError: can only concatenate str (not "int") to str',
    hint: "Convert the integer to string before concatenation",
  },
  {
    id: 9,
    description: "Fix the boolean comparison",
    brokenCode: `is_student = True
if is_student = True:
    print("Student discount applied")`,
    correctCode: `is_student = True
if is_student == True:
    print("Student discount applied")`,
    expectedOutput: "Student discount applied",
    currentOutput: "SyntaxError: invalid syntax",
    hint: "Use == for comparison, = is for assignment",
  },
  {
    id: 10,
    description: "Fix the import statement and function call",
    brokenCode: `import math
result = Math.sqrt(16)
print(result)`,
    correctCode: `import math
result = math.sqrt(16)
print(result)`,
    expectedOutput: "4.0",
    currentOutput: "NameError: name 'Math' is not defined",
    hint: "Python is case-sensitive, use lowercase 'math'",
  },
  {
    id: 11,
    description: "Fix the while loop condition",
    brokenCode: `count = 0
while count < 3
    print(count)
    count += 1`,
    correctCode: `count = 0
while count < 3:
    print(count)
    count += 1`,
    expectedOutput: "0\n1\n2",
    currentOutput: "SyntaxError: invalid syntax",
    hint: "While loops need a colon after the condition",
  },
  {
    id: 12,
    description: "Fix the class definition",
    brokenCode: `class Person
    def __init__(self, name):
        self.name = name`,
    correctCode: `class Person:
    def __init__(self, name):
        self.name = name`,
    expectedOutput: "Class defined successfully",
    currentOutput: "SyntaxError: invalid syntax",
    hint: "Class definitions need a colon",
  },
  {
    id: 13,
    description: "Fix the exception handling",
    brokenCode: `try:
    result = 10 / 0
except ZeroDivisionError
    print("Cannot divide by zero")`,
    correctCode: `try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero")`,
    expectedOutput: "Cannot divide by zero",
    currentOutput: "SyntaxError: invalid syntax",
    hint: "Exception handling needs a colon after except",
  },
  {
    id: 14,
    description: "Fix the list comprehension",
    brokenCode: `numbers = [1, 2, 3, 4, 5]
squares = [x*x for x in numbers
print(squares)`,
    correctCode: `numbers = [1, 2, 3, 4, 5]
squares = [x*x for x in numbers]
print(squares)`,
    expectedOutput: "[1, 4, 9, 16, 25]",
    currentOutput: "SyntaxError: invalid syntax",
    hint: "List comprehensions need closing bracket",
  },
  {
    id: 15,
    description: "Fix the f-string syntax",
    brokenCode: `name = "Alice"
age = 30
print(f"My name is {name and I am {age} years old")`,
    correctCode: `name = "Alice"
age = 30
print(f"My name is {name} and I am {age} years old")`,
    expectedOutput: "My name is Alice and I am 30 years old",
    currentOutput: "SyntaxError: invalid syntax",
    hint: "Check the f-string brackets and syntax",
  },
  {
    id: 16,
    description: "Fix the lambda function",
    brokenCode: `square = lambda x x * x
print(square(5))`,
    correctCode: `square = lambda x: x * x
print(square(5))`,
    expectedOutput: "25",
    currentOutput: "SyntaxError: invalid syntax",
    hint: "Lambda functions need a colon after parameters",
  },
  {
    id: 17,
    description: "Fix the file handling",
    brokenCode: `with open("test.txt", "w") as file
    file.write("Hello World")`,
    correctCode: `with open("test.txt", "w") as file:
    file.write("Hello World")`,
    expectedOutput: "File written successfully",
    currentOutput: "SyntaxError: invalid syntax",
    hint: "With statements need a colon",
  },
  {
    id: 18,
    description: "Fix the tuple unpacking",
    brokenCode: `coordinates = (3, 4)
x y = coordinates
print(f"x: {x}, y: {y}")`,
    correctCode: `coordinates = (3, 4)
x, y = coordinates
print(f"x: {x}, y: {y}")`,
    expectedOutput: "x: 3, y: 4",
    currentOutput: "SyntaxError: invalid syntax",
    hint: "Use comma to separate variables in tuple unpacking",
  },
  {
    id: 19,
    description: "Fix the set operations",
    brokenCode: `set1 = {1, 2, 3}
set2 = {3, 4, 5}
intersection = set1 & set2
print(intersection`,
    correctCode: `set1 = {1, 2, 3}
set2 = {3, 4, 5}
intersection = set1 & set2
print(intersection)`,
    expectedOutput: "{3}",
    currentOutput: "SyntaxError: unexpected EOF while parsing",
    hint: "Missing closing parenthesis in print statement",
  },
  {
    id: 20,
    description: "Fix the generator expression",
    brokenCode: `numbers = [1, 2, 3, 4, 5]
even_squares = (x**2 for x in numbers if x % 2 == 0
for square in even_squares:
    print(square)`,
    correctCode: `numbers = [1, 2, 3, 4, 5]
even_squares = (x**2 for x in numbers if x % 2 == 0)
for square in even_squares:
    print(square)`,
    expectedOutput: "4\n16",
    currentOutput: "SyntaxError: invalid syntax",
    hint: "Generator expressions need closing parenthesis",
  },
]

const javaChallenges: Challenge[] = [
  {
    id: 1,
    description: "Fix the missing semicolon",
    brokenCode: `public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello World")
    }
}`,
    correctCode: `public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`,
    expectedOutput: "Hello World",
    currentOutput: "Compilation error: ';' expected",
    hint: "Java statements must end with a semicolon",
  },
  {
    id: 2,
    description: "Fix the variable declaration",
    brokenCode: `public class Variables {
    public static void main(String[] args) {
        int age = 25
        System.out.println("Age: " + age);
    }
}`,
    correctCode: `public class Variables {
    public static void main(String[] args) {
        int age = 25;
        System.out.println("Age: " + age);
    }
}`,
    expectedOutput: "Age: 25",
    currentOutput: "Compilation error: ';' expected",
    hint: "Variable declarations need semicolons",
  },
  {
    id: 3,
    description: "Fix the string declaration",
    brokenCode: `public class StringTest {
    public static void main(String[] args) {
        String name = "Alice;
        System.out.println(name);
    }
}`,
    correctCode: `public class StringTest {
    public static void main(String[] args) {
        String name = "Alice";
        System.out.println(name);
    }
}`,
    expectedOutput: "Alice",
    currentOutput: "Compilation error: unclosed string literal",
    hint: "String literals need closing quotes",
  },
  {
    id: 4,
    description: "Fix the method declaration",
    brokenCode: `public class Methods {
    public static void greet(String name) {
        System.out.println("Hello, " + name);
    }
    
    public static void main(String[] args) {
        greet("Bob")
    }
}`,
    correctCode: `public class Methods {
    public static void greet(String name) {
        System.out.println("Hello, " + name);
    }
    
    public static void main(String[] args) {
        greet("Bob");
    }
}`,
    expectedOutput: "Hello, Bob",
    currentOutput: "Compilation error: ';' expected",
    hint: "Method calls need semicolons",
  },
  {
    id: 5,
    description: "Fix the array declaration",
    brokenCode: `public class Arrays {
    public static void main(String[] args) {
        int[] numbers = {1, 2, 3}
        System.out.println(numbers[0]);
    }
}`,
    correctCode: `public class Arrays {
    public static void main(String[] args) {
        int[] numbers = {1, 2, 3};
        System.out.println(numbers[0]);
    }
}`,
    expectedOutput: "1",
    currentOutput: "Compilation error: ';' expected",
    hint: "Array declarations need semicolons",
  },
  {
    id: 6,
    description: "Fix the if statement",
    brokenCode: `public class Conditions {
    public static void main(String[] args) {
        int score = 85;
        if (score >= 80) {
            System.out.println("Good job!")
        }
    }
}`,
    correctCode: `public class Conditions {
    public static void main(String[] args) {
        int score = 85;
        if (score >= 80) {
            System.out.println("Good job!");
        }
    }
}`,
    expectedOutput: "Good job!",
    currentOutput: "Compilation error: ';' expected",
    hint: "Statements inside if blocks need semicolons",
  },
  {
    id: 7,
    description: "Fix the for loop",
    brokenCode: `public class Loops {
    public static void main(String[] args) {
        for (int i = 0; i < 3; i++) {
            System.out.println(i)
        }
    }
}`,
    correctCode: `public class Loops {
    public static void main(String[] args) {
        for (int i = 0; i < 3; i++) {
            System.out.println(i);
        }
    }
}`,
    expectedOutput: "0\n1\n2",
    currentOutput: "Compilation error: ';' expected",
    hint: "Statements in loops need semicolons",
  },
  {
    id: 8,
    description: "Fix the class constructor",
    brokenCode: `public class Person {
    private String name;
    
    public Person(String name) {
        this.name = name
    }
    
    public static void main(String[] args) {
        Person p = new Person("Alice");
    }
}`,
    correctCode: `public class Person {
    private String name;
    
    public Person(String name) {
        this.name = name;
    }
    
    public static void main(String[] args) {
        Person p = new Person("Alice");
    }
}`,
    expectedOutput: "Object created successfully",
    currentOutput: "Compilation error: ';' expected",
    hint: "Constructor statements need semicolons",
  },
  {
    id: 9,
    description: "Fix the return statement",
    brokenCode: `public class Calculator {
    public static int add(int a, int b) {
        return a + b
    }
    
    public static void main(String[] args) {
        int result = add(5, 3);
        System.out.println(result);
    }
}`,
    correctCode: `public class Calculator {
    public static int add(int a, int b) {
        return a + b;
    }
    
    public static void main(String[] args) {
        int result = add(5, 3);
        System.out.println(result);
    }
}`,
    expectedOutput: "8",
    currentOutput: "Compilation error: ';' expected",
    hint: "Return statements need semicolons",
  },
  {
    id: 10,
    description: "Fix the while loop",
    brokenCode: `public class WhileLoop {
    public static void main(String[] args) {
        int count = 0;
        while (count < 3) {
            System.out.println(count)
            count++;
        }
    }
}`,
    correctCode: `public class WhileLoop {
    public static void main(String[] args) {
        int count = 0;
        while (count < 3) {
            System.out.println(count);
            count++;
        }
    }
}`,
    expectedOutput: "0\n1\n2",
    currentOutput: "Compilation error: ';' expected",
    hint: "Print statements need semicolons",
  },
  {
    id: 11,
    description: "Fix the switch statement",
    brokenCode: `public class Switch {
    public static void main(String[] args) {
        int day = 1;
        switch (day) {
            case 1:
                System.out.println("Monday")
                break;
            default:
                System.out.println("Other day");
        }
    }
}`,
    correctCode: `public class Switch {
    public static void main(String[] args) {
        int day = 1;
        switch (day) {
            case 1:
                System.out.println("Monday");
                break;
            default:
                System.out.println("Other day");
        }
    }
}`,
    expectedOutput: "Monday",
    currentOutput: "Compilation error: ';' expected",
    hint: "Case statements need semicolons",
  },
  {
    id: 12,
    description: "Fix the try-catch block",
    brokenCode: `public class Exception {
    public static void main(String[] args) {
        try {
            int result = 10 / 0
        } catch (ArithmeticException e) {
            System.out.println("Division by zero");
        }
    }
}`,
    correctCode: `public class Exception {
    public static void main(String[] args) {
        try {
            int result = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("Division by zero");
        }
    }
}`,
    expectedOutput: "Division by zero",
    currentOutput: "Compilation error: ';' expected",
    hint: "Statements in try blocks need semicolons",
  },
  {
    id: 13,
    description: "Fix the interface implementation",
    brokenCode: `interface Drawable {
    void draw();
}

public class Circle implements Drawable {
    public void draw() {
        System.out.println("Drawing circle")
    }
}`,
    correctCode: `interface Drawable {
    void draw();
}

public class Circle implements Drawable {
    public void draw() {
        System.out.println("Drawing circle");
    }
}`,
    expectedOutput: "Drawing circle",
    currentOutput: "Compilation error: ';' expected",
    hint: "Method implementations need semicolons",
  },
  {
    id: 14,
    description: "Fix the static block",
    brokenCode: `public class StaticBlock {
    static {
        System.out.println("Static block executed")
    }
    
    public static void main(String[] args) {
        System.out.println("Main method");
    }
}`,
    correctCode: `public class StaticBlock {
    static {
        System.out.println("Static block executed");
    }
    
    public static void main(String[] args) {
        System.out.println("Main method");
    }
}`,
    expectedOutput: "Static block executed\nMain method",
    currentOutput: "Compilation error: ';' expected",
    hint: "Static block statements need semicolons",
  },
  {
    id: 15,
    description: "Fix the enum declaration",
    brokenCode: `public enum Color {
    RED, GREEN, BLUE
}

public class EnumTest {
    public static void main(String[] args) {
        Color c = Color.RED
        System.out.println(c);
    }
}`,
    correctCode: `public enum Color {
    RED, GREEN, BLUE
}

public class EnumTest {
    public static void main(String[] args) {
        Color c = Color.RED;
        System.out.println(c);
    }
}`,
    expectedOutput: "RED",
    currentOutput: "Compilation error: ';' expected",
    hint: "Enum assignments need semicolons",
  },
  {
    id: 16,
    description: "Fix the generic class",
    brokenCode: `public class Box<T> {
    private T item;
    
    public void setItem(T item) {
        this.item = item
    }
    
    public T getItem() {
        return item;
    }
}`,
    correctCode: `public class Box<T> {
    private T item;
    
    public void setItem(T item) {
        this.item = item;
    }
    
    public T getItem() {
        return item;
    }
}`,
    expectedOutput: "Generic class compiled successfully",
    currentOutput: "Compilation error: ';' expected",
    hint: "Assignment statements need semicolons",
  },
  {
    id: 17,
    description: "Fix the lambda expression",
    brokenCode: `import java.util.function.Function;

public class Lambda {
    public static void main(String[] args) {
        Function<Integer, Integer> square = x -> x * x
        System.out.println(square.apply(5));
    }
}`,
    correctCode: `import java.util.function.Function;

public class Lambda {
    public static void main(String[] args) {
        Function<Integer, Integer> square = x -> x * x;
        System.out.println(square.apply(5));
    }
}`,
    expectedOutput: "25",
    currentOutput: "Compilation error: ';' expected",
    hint: "Lambda assignments need semicolons",
  },
  {
    id: 18,
    description: "Fix the annotation",
    brokenCode: `public class Override {
    @Override
    public String toString() {
        return "Override example"
    }
    
    public static void main(String[] args) {
        Override obj = new Override();
        System.out.println(obj.toString());
    }
}`,
    correctCode: `public class Override {
    @Override
    public String toString() {
        return "Override example";
    }
    
    public static void main(String[] args) {
        Override obj = new Override();
        System.out.println(obj.toString());
    }
}`,
    expectedOutput: "Override example",
    currentOutput: "Compilation error: ';' expected",
    hint: "Return statements need semicolons",
  },
  {
    id: 19,
    description: "Fix the synchronized block",
    brokenCode: `public class Sync {
    private static final Object lock = new Object();
    
    public static void main(String[] args) {
        synchronized (lock) {
            System.out.println("Synchronized block")
        }
    }
}`,
    correctCode: `public class Sync {
    private static final Object lock = new Object();
    
    public static void main(String[] args) {
        synchronized (lock) {
            System.out.println("Synchronized block");
        }
    }
}`,
    expectedOutput: "Synchronized block",
    currentOutput: "Compilation error: ';' expected",
    hint: "Synchronized block statements need semicolons",
  },
  {
    id: 20,
    description: "Fix the assert statement",
    brokenCode: `public class Assert {
    public static void main(String[] args) {
        int x = 5;
        assert x > 0 : "x should be positive"
        System.out.println("Assertion passed");
    }
}`,
    correctCode: `public class Assert {
    public static void main(String[] args) {
        int x = 5;
        assert x > 0 : "x should be positive";
        System.out.println("Assertion passed");
    }
}`,
    expectedOutput: "Assertion passed",
    currentOutput: "Compilation error: ';' expected",
    hint: "Assert statements need semicolons",
  },
]

const htmlChallenges: Challenge[] = [
  {
    id: 1,
    description: "Fix the missing closing tag for the heading",
    brokenCode: `<html>
<body>
    <h1>Welcome to my website
    <p>This is a paragraph.</p>
</body>
</html>`,
    correctCode: `<html>
<body>
    <h1>Welcome to my website</h1>
    <p>This is a paragraph.</p>
</body>
</html>`,
    expectedOutput: "Properly closed heading tag",
    currentOutput: "Unclosed h1 tag error",
    hint: "HTML tags must be closed with </tagname>",
  },
  {
    id: 2,
    description: "Fix the missing closing quote in the image tag",
    brokenCode: `<html>
<body>
    <img src="photo.jpg alt="My Photo">
    <p>Here is my photo!</p>
</body>
</html>`,
    correctCode: `<html>
<body>
    <img src="photo.jpg" alt="My Photo">
    <p>Here is my photo!</p>
</body>
</html>`,
    expectedOutput: "Properly quoted image attributes",
    currentOutput: "Syntax error in img tag",
    hint: "All HTML attributes need closing quotes",
  },
  {
    id: 3,
    description: "Fix the missing closing tag for the paragraph",
    brokenCode: `<html>
<body>
    <h1>My Blog</h1>
    <p>This is my first blog post.
    <p>This is my second blog post.</p>
</body>
</html>`,
    correctCode: `<html>
<body>
    <h1>My Blog</h1>
    <p>This is my first blog post.</p>
    <p>This is my second blog post.</p>
</body>
</html>`,
    expectedOutput: "Both paragraphs properly closed",
    currentOutput: "Unclosed paragraph tag",
    hint: "Every opening tag needs a closing tag",
  },
  {
    id: 4,
    description: "Fix the missing closing tag for the link",
    brokenCode: `<html>
<body>
    <h1>My Links</h1>
    <a href="https://google.com">Visit Google
    <p>Click the link above!</p>
</body>
</html>`,
    correctCode: `<html>
<body>
    <h1>My Links</h1>
    <a href="https://google.com">Visit Google</a>
    <p>Click the link above!</p>
</body>
</html>`,
    expectedOutput: "Properly closed link tag",
    currentOutput: "Unclosed anchor tag",
    hint: "Links need closing </a> tags",
  },
  {
    id: 5,
    description: "Fix the missing closing tag for the list item",
    brokenCode: `<html>
<body>
    <h1>My Favorite Foods</h1>
    <ul>
        <li>Pizza
        <li>Burgers</li>
        <li>Ice Cream</li>
    </ul>
</body>
</html>`,
    correctCode: `<html>
<body>
    <h1>My Favorite Foods</h1>
    <ul>
        <li>Pizza</li>
        <li>Burgers</li>
        <li>Ice Cream</li>
    </ul>
</body>
</html>`,
    expectedOutput: "All list items properly closed",
    currentOutput: "Unclosed list item",
    hint: "List items need closing </li> tags",
  },
  {
    id: 6,
    description: "Fix the missing opening quote in the link",
    brokenCode: `<html>
<body>
    <h1>Contact Me</h1>
    <a href=mailto:john@email.com">Send Email</a>
</body>
</html>`,
    correctCode: `<html>
<body>
    <h1>Contact Me</h1>
    <a href="mailto:john@email.com">Send Email</a>
</body>
</html>`,
    expectedOutput: "Properly quoted href attribute",
    currentOutput: "Syntax error in href attribute",
    hint: "Attributes need both opening and closing quotes",
  },
  {
    id: 7,
    description: "Fix the missing closing tag for the div",
    brokenCode: `<html>
<body>
    <div>
        <h1>Welcome</h1>
        <p>This is inside a div.</p>
    <p>This is outside the div.</p>
</body>
</html>`,
    correctCode: `<html>
<body>
    <div>
        <h1>Welcome</h1>
        <p>This is inside a div.</p>
    </div>
    <p>This is outside the div.</p>
</body>
</html>`,
    expectedOutput: "Properly closed div container",
    currentOutput: "Unclosed div tag",
    hint: "Container tags like div need closing tags",
  },
  {
    id: 8,
    description: "Fix the missing closing tag for the button",
    brokenCode: `<html>
<body>
    <h1>Click Me!</h1>
    <button>Click Here
    <p>Press the button above.</p>
</body>
</html>`,
    correctCode: `<html>
<body>
    <h1>Click Me!</h1>
    <button>Click Here</button>
    <p>Press the button above.</p>
</body>
</html>`,
    expectedOutput: "Properly closed button tag",
    currentOutput: "Unclosed button tag",
    hint: "Buttons need closing </button> tags",
  },
  {
    id: 9,
    description: "Fix the missing closing tag for the table cell",
    brokenCode: `<html>
<body>
    <table>
        <tr>
            <td>Name
            <td>Age</td>
        </tr>
    </table>
</body>
</html>`,
    correctCode: `<html>
<body>
    <table>
        <tr>
            <td>Name</td>
            <td>Age</td>
        </tr>
    </table>
</body>
</html>`,
    expectedOutput: "Properly closed table cells",
    currentOutput: "Unclosed table cell",
    hint: "Table cells need closing </td> tags",
  },
  {
    id: 10,
    description: "Fix the missing closing tag for the span",
    brokenCode: `<html>
<body>
    <p>This is <span style="color: red;">red text and this is normal text.</p>
</body>
</html>`,
    correctCode: `<html>
<body>
    <p>This is <span style="color: red;">red text</span> and this is normal text.</p>
</body>
</html>`,
    expectedOutput: "Properly closed span tag",
    currentOutput: "Unclosed span tag",
    hint: "Span tags need closing </span> tags",
  },
  {
    id: 11,
    description: "Fix the missing closing tag for the form",
    brokenCode: `<html>
<body>
    <form>
        <input type="text" placeholder="Your name">
        <button type="submit">Submit</button>
    <p>Fill out the form above.</p>
</body>
</html>`,
    correctCode: `<html>
<body>
    <form>
        <input type="text" placeholder="Your name">
        <button type="submit">Submit</button>
    </form>
    <p>Fill out the form above.</p>
</body>
</html>`,
    expectedOutput: "Properly closed form tag",
    currentOutput: "Unclosed form tag",
    hint: "Forms need closing </form> tags",
  },
  {
    id: 12,
    description: "Fix the missing closing quote for the class attribute",
    brokenCode: `<html>
<body>
    <div class="container>
        <h1>My Website</h1>
    </div>
</body>
</html>`,
    correctCode: `<html>
<body>
    <div class="container">
        <h1>My Website</h1>
    </div>
</body>
</html>`,
    expectedOutput: "Properly quoted class attribute",
    currentOutput: "Syntax error in class attribute",
    hint: "Class attributes need closing quotes",
  },
  {
    id: 13,
    description: "Fix the missing closing tag for the strong element",
    brokenCode: `<html>
<body>
    <p>This is <strong>very important text and this is normal.</p>
</body>
</html>`,
    correctCode: `<html>
<body>
    <p>This is <strong>very important</strong> text and this is normal.</p>
</body>
</html>`,
    expectedOutput: "Properly closed strong tag",
    currentOutput: "Unclosed strong tag",
    hint: "Strong tags need closing </strong> tags",
  },
  {
    id: 14,
    description: "Fix the missing closing tag for the header",
    brokenCode: `<html>
<body>
    <header>
        <h1>My Website</h1>
        <p>Welcome to my site!</p>
    <main>
        <p>Main content here.</p>
    </main>
</body>
</html>`,
    correctCode: `<html>
<body>
    <header>
        <h1>My Website</h1>
        <p>Welcome to my site!</p>
    </header>
    <main>
        <p>Main content here.</p>
    </main>
</body>
</html>`,
    expectedOutput: "Properly closed header tag",
    currentOutput: "Unclosed header tag",
    hint: "Header sections need closing </header> tags",
  },
  {
    id: 15,
    description: "Fix the missing closing tag for the emphasis element",
    brokenCode: `<html>
<body>
    <p>This word is <em>emphasized and this is normal text.</p>
</body>
</html>`,
    correctCode: `<html>
<body>
    <p>This word is <em>emphasized</em> and this is normal text.</p>
</body>
</html>`,
    expectedOutput: "Properly closed emphasis tag",
    currentOutput: "Unclosed em tag",
    hint: "Emphasis tags need closing </em> tags",
  },
  {
    id: 16,
    description: "Fix the missing closing tag for the section",
    brokenCode: `<html>
<body>
    <section>
        <h2>About Me</h2>
        <p>I am a student.</p>
    <section>
        <h2>My Hobbies</h2>
        <p>I like coding.</p>
    </section>
</body>
</html>`,
    correctCode: `<html>
<body>
    <section>
        <h2>About Me</h2>
        <p>I am a student.</p>
    </section>
    <section>
        <h2>My Hobbies</h2>
        <p>I like coding.</p>
    </section>
</body>
</html>`,
    expectedOutput: "Both sections properly closed",
    currentOutput: "Unclosed section tag",
    hint: "Section tags need closing </section> tags",
  },
  {
    id: 17,
    description: "Fix the missing closing tag for the article",
    brokenCode: `<html>
<body>
    <article>
        <h2>My First Blog Post</h2>
        <p>This is my first post!</p>
    <p>Thanks for reading!</p>
</body>
</html>`,
    correctCode: `<html>
<body>
    <article>
        <h2>My First Blog Post</h2>
        <p>This is my first post!</p>
    </article>
    <p>Thanks for reading!</p>
</body>
</html>`,
    expectedOutput: "Properly closed article tag",
    currentOutput: "Unclosed article tag",
    hint: "Article tags need closing </article> tags",
  },
  {
    id: 18,
    description: "Fix the missing closing tag for the footer",
    brokenCode: `<html>
<body>
    <main>
        <h1>Welcome</h1>
        <p>Main content here.</p>
    </main>
    <footer>
        <p>Copyright 2025</p>
</body>
</html>`,
    correctCode: `<html>
<body>
    <main>
        <h1>Welcome</h1>
        <p>Main content here.</p>
    </main>
    <footer>
        <p>Copyright 2025</p>
    </footer>
</body>
</html>`,
    expectedOutput: "Properly closed footer tag",
    currentOutput: "Unclosed footer tag",
    hint: "Footer sections need closing </footer> tags",
  },
  {
    id: 19,
    description: "Fix the missing closing tag for the nav element",
    brokenCode: `<html>
<body>
    <nav>
        <a href="#home">Home</a>
        <a href="#about">About</a>
    <main>
        <h1>Welcome</h1>
    </main>
</body>
</html>`,
    correctCode: `<html>
<body>
    <nav>
        <a href="#home">Home</a>
        <a href="#about">About</a>
    </nav>
    <main>
        <h1>Welcome</h1>
    </main>
</body>
</html>`,
    expectedOutput: "Properly closed nav tag",
    currentOutput: "Unclosed nav tag",
    hint: "Navigation sections need closing </nav> tags",
  },
  {
    id: 20,
    description: "Fix the missing closing tag for the label",
    brokenCode: `<html>
<body>
    <form>
        <label for="name">Your Name:
        <input type="text" id="name">
        <button type="submit">Submit</button>
    </form>
</body>
</html>`,
    correctCode: `<html>
<body>
    <form>
        <label for="name">Your Name:</label>
        <input type="text" id="name">
        <button type="submit">Submit</button>
    </form>
</body>
</html>`,
    expectedOutput: "Properly closed label tag",
    currentOutput: "Unclosed label tag",
    hint: "Label tags need closing </label> tags",
  },
]

const cssChallenges: Challenge[] = [
  {
    id: 1,
    description: "Fix the missing semicolon in CSS",
    brokenCode: `.container {
    width: 100%
    height: 200px;
    background-color: blue;
}`,
    correctCode: `.container {
    width: 100%;
    height: 200px;
    background-color: blue;
}`,
    expectedOutput: "Valid CSS with proper syntax",
    currentOutput: "CSS parsing error",
    hint: "CSS properties must end with semicolons",
  },
  {
    id: 2,
    description: "Fix the missing closing brace",
    brokenCode: `.header {
    background-color: red;
    padding: 20px;

.footer {
    background-color: blue;
}`,
    correctCode: `.header {
    background-color: red;
    padding: 20px;
}

.footer {
    background-color: blue;
}`,
    expectedOutput: "Properly closed CSS rules",
    currentOutput: "CSS syntax error - missing brace",
    hint: "CSS rules must have closing braces",
  },
  {
    id: 3,
    description: "Fix the invalid property value",
    brokenCode: `.box {
    width: 200;
    height: 100px;
    margin: 10px;
}`,
    correctCode: `.box {
    width: 200px;
    height: 100px;
    margin: 10px;
}`,
    expectedOutput: "Valid CSS with units",
    currentOutput: "Invalid property value",
    hint: "CSS length values need units",
  },
  {
    id: 4,
    description: "Fix the color syntax",
    brokenCode: `.text {
    color: #ff000;
    font-size: 16px;
}`,
    correctCode: `.text {
    color: #ff0000;
    font-size: 16px;
}`,
    expectedOutput: "Valid hex color",
    currentOutput: "Invalid color value",
    hint: "Hex colors need 6 digits",
  },
  {
    id: 5,
    description: "Fix the selector syntax",
    brokenCode: `div .class {
    background: white;
}

#id element {
    color: black
}`,
    correctCode: `div .class {
    background: white;
}

#id element {
    color: black;
}`,
    expectedOutput: "Valid CSS selectors",
    currentOutput: "Missing semicolon",
    hint: "All CSS properties need semicolons",
  },
  {
    id: 6,
    description: "Fix the media query syntax",
    brokenCode: `@media screen and max-width: 768px {
    .container {
        width: 100%;
    }
}`,
    correctCode: `@media screen and (max-width: 768px) {
    .container {
        width: 100%;
    }
}`,
    expectedOutput: "Valid media query",
    currentOutput: "Media query syntax error",
    hint: "Media query conditions need parentheses",
  },
  {
    id: 7,
    description: "Fix the font-family syntax",
    brokenCode: `.text {
    font-family: Arial sans-serif;
    font-size: 14px;
}`,
    correctCode: `.text {
    font-family: Arial, sans-serif;
    font-size: 14px;
}`,
    expectedOutput: "Valid font-family",
    currentOutput: "Invalid font-family syntax",
    hint: "Font families should be separated by commas",
  },
  {
    id: 8,
    description: "Fix the background shorthand",
    brokenCode: `.banner {
    background: url('image.jpg') no-repeat center
    padding: 50px;
}`,
    correctCode: `.banner {
    background: url('image.jpg') no-repeat center;
    padding: 50px;
}`,
    expectedOutput: "Valid background property",
    currentOutput: "Missing semicolon",
    hint: "Background shorthand needs semicolon",
  },
  {
    id: 9,
    description: "Fix the border syntax",
    brokenCode: `.box {
    border: 1px solid;
    border-color red;
    padding: 10px;
}`,
    correctCode: `.box {
    border: 1px solid;
    border-color: red;
    padding: 10px;
}`,
    expectedOutput: "Valid border properties",
    currentOutput: "Missing colon in property",
    hint: "CSS properties need colons after property name",
  },
  {
    id: 10,
    description: "Fix the flexbox syntax",
    brokenCode: `.flex-container {
    display: flex;
    justify-content center;
    align-items: center;
}`,
    correctCode: `.flex-container {
    display: flex;
    justify-content: center;
    align-items: center;
}`,
    expectedOutput: "Valid flexbox properties",
    currentOutput: "Missing colon",
    hint: "Property names need colons",
  },
  {
    id: 11,
    description: "Fix the grid syntax",
    brokenCode: `.grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr
    gap: 20px;
}`,
    correctCode: `.grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
}`,
    expectedOutput: "Valid grid properties",
    currentOutput: "Missing semicolon",
    hint: "Grid properties need semicolons",
  },
  {
    id: 12,
    description: "Fix the transform syntax",
    brokenCode: `.rotate {
    transform: rotate(45deg)
    transition: transform 0.3s;
}`,
    correctCode: `.rotate {
    transform: rotate(45deg);
    transition: transform 0.3s;
}`,
    expectedOutput: "Valid transform property",
    currentOutput: "Missing semicolon",
    hint: "Transform properties need semicolons",
  },
  {
    id: 13,
    description: "Fix the animation syntax",
    brokenCode: `@keyframes slide {
    from { left: 0; }
    to { left: 100px }
}

.animated {
    animation: slide 2s ease;
}`,
    correctCode: `@keyframes slide {
    from { left: 0; }
    to { left: 100px; }
}

.animated {
    animation: slide 2s ease;
}`,
    expectedOutput: "Valid keyframes",
    currentOutput: "Missing semicolon in keyframes",
    hint: "Keyframe properties need semicolons",
  },
  {
    id: 14,
    description: "Fix the pseudo-selector syntax",
    brokenCode: `.button:hover {
    background-color: blue
    color: white;
}

.link::before {
    content: "→";
}`,
    correctCode: `.button:hover {
    background-color: blue;
    color: white;
}

.link::before {
    content: "→";
}`,
    expectedOutput: "Valid pseudo-selectors",
    currentOutput: "Missing semicolon",
    hint: "Pseudo-selector properties need semicolons",
  },
  {
    id: 15,
    description: "Fix the calc() function",
    brokenCode: `.responsive {
    width: calc(100% - 20px)
    height: calc(100vh - 50px);
}`,
    correctCode: `.responsive {
    width: calc(100% - 20px);
    height: calc(100vh - 50px);
}`,
    expectedOutput: "Valid calc() functions",
    currentOutput: "Missing semicolon",
    hint: "Calc() functions need semicolons",
  },
  {
    id: 16,
    description: "Fix the CSS variable syntax",
    brokenCode: `:root {
    --primary-color: #3498db
    --secondary-color: #2ecc71;
}

.element {
    color: var(--primary-color);
}`,
    correctCode: `:root {
    --primary-color: #3498db;
    --secondary-color: #2ecc71;
}

.element {
    color: var(--primary-color);
}`,
    expectedOutput: "Valid CSS variables",
    currentOutput: "Missing semicolon",
    hint: "CSS variable declarations need semicolons",
  },
  {
    id: 17,
    description: "Fix the gradient syntax",
    brokenCode: `.gradient {
    background: linear-gradient(45deg, red, blue)
    height: 200px;
}`,
    correctCode: `.gradient {
    background: linear-gradient(45deg, red, blue);
    height: 200px;
}`,
    expectedOutput: "Valid gradient",
    currentOutput: "Missing semicolon",
    hint: "Gradient properties need semicolons",
  },
  {
    id: 18,
    description: "Fix the box-shadow syntax",
    brokenCode: `.shadow {
    box-shadow: 0 2px 4px rgba(0,0,0,0.1)
    padding: 20px;
}`,
    correctCode: `.shadow {
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    padding: 20px;
}`,
    expectedOutput: "Valid box-shadow",
    currentOutput: "Missing semicolon",
    hint: "Box-shadow properties need semicolons",
  },
  {
    id: 19,
    description: "Fix the filter syntax",
    brokenCode: `.filtered {
    filter: blur(5px) brightness(1.2)
    opacity: 0.8;
}`,
    correctCode: `.filtered {
    filter: blur(5px) brightness(1.2);
    opacity: 0.8;
}`,
    expectedOutput: "Valid filter property",
    currentOutput: "Missing semicolon",
    hint: "Filter properties need semicolons",
  },
  {
    id: 20,
    description: "Fix the clip-path syntax",
    brokenCode: `.clipped {
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%)
    width: 200px;
    height: 200px;
}`,
    correctCode: `.clipped {
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    width: 200px;
    height: 200px;
}`,
    expectedOutput: "Valid clip-path",
    currentOutput: "Missing semicolon",
    hint: "Clip-path properties need semicolons",
  },
]

export function getRandomChallenges(language: string, count: number): Challenge[] {
  let challenges: Challenge[] = []

  switch (language.toLowerCase()) {
    case "python":
      challenges = pythonChallenges
      break
    case "java":
      challenges = javaChallenges
      break
    case "html":
      challenges = htmlChallenges
      break
    case "css":
      challenges = cssChallenges
      break
    default:
      challenges = pythonChallenges
  }

  // Shuffle array and return specified count
  const shuffled = [...challenges].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}
