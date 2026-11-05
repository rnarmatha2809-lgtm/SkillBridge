
const roleAssessmentData = {
  'Frontend Developer': [
    {
      skill: 'HTML',
      question: 'Which HTML element is used to create a hyperlink?',
      options: ['<link>', '<a>', '<href>', '<url>'],
      answer: '<a>'
    },
    {
      skill: 'HTML',
      question: 'Which HTML element represents the main content of a page?',
      options: ['<main>', '<head>', '<footer>', '<meta>'],
      answer: '<main>'
    },
    {
      skill: 'CSS',
      question: 'Which CSS property changes the text color?',
      options: ['font-style', 'background', 'color', 'text-align'],
      answer: 'color'
    },
    {
      skill: 'CSS',
      question: 'Which CSS layout system is designed for one-dimensional layouts?',
      options: ['Grid', 'Flexbox', 'Float', 'Position'],
      answer: 'Flexbox'
    },
    {
      skill: 'JavaScript',
      question: 'Which keyword declares a block-scoped variable that can be reassigned?',
      options: ['const', 'let', 'static', 'final'],
      answer: 'let'
    },
    {
      skill: 'JavaScript',
      question: 'Which method converts a JSON string into a JavaScript object?',
      options: ['JSON.stringify()', 'JSON.parse()', 'JSON.convert()', 'JSON.object()'],
      answer: 'JSON.parse()'
    },
    {
      skill: 'React',
      question: 'Which React hook is used to manage component state?',
      options: ['useEffect', 'useState', 'useRef', 'useMemo'],
      answer: 'useState'
    },
    {
      skill: 'React',
      question: 'What is the purpose of props in React?',
      options: [
        'To pass data between components',
        'To create database tables',
        'To style HTML elements',
        'To run SQL queries'
      ],
      answer: 'To pass data between components'
    },
    {
      skill: 'Git',
      question: 'Which command saves staged changes as a Git commit?',
      options: ['git push', 'git commit', 'git pull', 'git status'],
      answer: 'git commit'
    },
    {
      skill: 'Git',
      question: 'Which command downloads and integrates changes from a remote repository?',
      options: ['git pull', 'git init', 'git add', 'git log'],
      answer: 'git pull'
    }
  ],

  'Backend Developer': [
    {
      skill: 'JavaScript',
      question: 'Which keyword is used to declare a constant in JavaScript?',
      options: ['var', 'let', 'const', 'define'],
      answer: 'const'
    },
    {
      skill: 'JavaScript',
      question: 'Which method is commonly used to handle a Promise result?',
      options: ['then()', 'print()', 'repeat()', 'push()'],
      answer: 'then()'
    },
    {
      skill: 'Node.js',
      question: 'What is Node.js?',
      options: [
        'A JavaScript runtime',
        'A database',
        'A CSS framework',
        'An HTML editor'
      ],
      answer: 'A JavaScript runtime'
    },
    {
      skill: 'Node.js',
      question: 'Which Node.js module helps work with file paths?',
      options: ['http', 'path', 'events', 'crypto'],
      answer: 'path'
    },
    {
      skill: 'Express',
      question: 'How do you define a GET route in Express?',
      options: [
        'app.get()',
        'app.fetch()',
        'app.select()',
        'app.routeGet()'
      ],
      answer: 'app.get()'
    },
    {
      skill: 'Express',
      question: 'Which Express method is commonly used to register middleware?',
      options: ['app.use()', 'app.start()', 'app.create()', 'app.open()'],
      answer: 'app.use()'
    },
    {
      skill: 'MongoDB',
      question: 'What type of database is MongoDB?',
      options: ['Relational', 'Document-oriented', 'Graph-only', 'Spreadsheet'],
      answer: 'Document-oriented'
    },
    {
      skill: 'MongoDB',
      question: 'Which MongoDB method inserts one document?',
      options: ['insertOne()', 'addRow()', 'createTable()', 'pushOne()'],
      answer: 'insertOne()'
    },
    {
      skill: 'Git',
      question: 'Which command displays the current working-tree status?',
      options: ['git status', 'git commit', 'git merge', 'git clone'],
      answer: 'git status'
    },
    {
      skill: 'Git',
      question: 'Which command creates a local copy of a remote repository?',
      options: ['git clone', 'git reset', 'git remove', 'git checkout'],
      answer: 'git clone'
    }
  ],

  'Full Stack Developer': [
    {
      skill: 'HTML',
      question: 'Which HTML attribute provides alternative text for an image?',
      options: ['src', 'alt', 'href', 'title-only'],
      answer: 'alt'
    },
    {
      skill: 'HTML',
      question: 'Which HTML element is used to create a form?',
      options: ['<form>', '<section>', '<table>', '<article>'],
      answer: '<form>'
    },
    {
      skill: 'CSS',
      question: 'Which CSS property controls the space inside an element border?',
      options: ['margin', 'padding', 'outline', 'gap-only'],
      answer: 'padding'
    },
    {
      skill: 'CSS',
      question: 'Which CSS rule makes a layout adapt to different screen sizes?',
      options: ['Media query', 'Keyframe only', 'Text transform', 'Font face'],
      answer: 'Media query'
    },
    {
      skill: 'JavaScript',
      question: 'Which operator checks both value and type equality?',
      options: ['==', '=', '===', '!='],
      answer: '==='
    },
    {
      skill: 'React',
      question: 'Which prop is important when rendering lists of React elements?',
      options: ['id', 'key', 'class', 'index-only'],
      answer: 'key'
    },
    {
      skill: 'React',
      question: 'Which hook can perform side effects after rendering?',
      options: ['useEffect', 'useState', 'useContext', 'useId'],
      answer: 'useEffect'
    },
    {
      skill: 'Node.js',
      question: 'Which Node.js feature supports non-blocking input/output?',
      options: ['Event loop', 'HTML parser', 'CSS cascade', 'DOM tree'],
      answer: 'Event loop'
    },
    {
      skill: 'Express',
      question: 'Which object commonly contains route parameters in Express?',
      options: ['req.params', 'res.params', 'app.params', 'server.params'],
      answer: 'req.params'
    },
    {
      skill: 'MongoDB',
      question: 'Which MongoDB operator updates a field without replacing the whole document?',
      options: ['$set', '$drop', '$remove', '$replaceAll'],
      answer: '$set'
    }
  ],

  'Python Developer': [
    {
      skill: 'Python',
      question: 'Which keyword defines a function in Python?',
      options: ['function', 'def', 'fun', 'method'],
      answer: 'def'
    },
    {
      skill: 'Python',
      question: 'Which Python data type stores key-value pairs?',
      options: ['List', 'Tuple', 'Dictionary', 'Set'],
      answer: 'Dictionary'
    },
    {
      skill: 'Python',
      question: 'Which keyword is used to handle exceptions?',
      options: ['try', 'check', 'error', 'catch-only'],
      answer: 'try'
    },
    {
      skill: 'SQL',
      question: 'Which SQL statement retrieves records from a table?',
      options: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'],
      answer: 'SELECT'
    },
    {
      skill: 'SQL',
      question: 'Which SQL clause filters grouped results?',
      options: ['WHERE', 'HAVING', 'ORDER BY', 'LIMIT'],
      answer: 'HAVING'
    },
    {
      skill: 'Django',
      question: 'What is Django?',
      options: [
        'A Python web framework',
        'A database language',
        'A JavaScript runtime',
        'An operating system'
      ],
      answer: 'A Python web framework'
    },
    {
      skill: 'Django',
      question: 'Which Django component maps URLs to views?',
      options: ['URLconf', 'Template filter', 'Static folder', 'Admin model'],
      answer: 'URLconf'
    },
    {
      skill: 'Git',
      question: 'Which command stages a file for a commit?',
      options: ['git add', 'git status', 'git pull', 'git log'],
      answer: 'git add'
    },
    {
      skill: 'Problem Solving',
      question: 'What is the first useful step when solving a programming problem?',
      options: [
        'Understand the problem and requirements',
        'Immediately write random code',
        'Ignore edge cases',
        'Delete the input'
      ],
      answer: 'Understand the problem and requirements'
    },
    {
      skill: 'Problem Solving',
      question: 'What does debugging help a developer do?',
      options: [
        'Find and fix errors',
        'Design logos',
        'Create databases automatically',
        'Compress images'
      ],
      answer: 'Find and fix errors'
    }
  ],

  'Software Developer': [
    {
      skill: 'Java',
      question: 'Which method is the usual entry point of a Java application?',
      options: ['start()', 'main()', 'runApp()', 'execute()'],
      answer: 'main()'
    },
    {
      skill: 'Java',
      question: 'Which keyword creates an object in Java?',
      options: ['class', 'new', 'this', 'import'],
      answer: 'new'
    },
    {
      skill: 'Python',
      question: 'Which function displays output in Python?',
      options: ['echo()', 'print()', 'displayText()', 'writeLine()'],
      answer: 'print()'
    },
    {
      skill: 'Python',
      question: 'Which Python collection is ordered and mutable?',
      options: ['Tuple', 'List', 'String', 'Frozen set'],
      answer: 'List'
    },
    {
      skill: 'Data Structures',
      question: 'Which data structure follows Last In, First Out?',
      options: ['Queue', 'Stack', 'Tree', 'Graph'],
      answer: 'Stack'
    },
    {
      skill: 'Data Structures',
      question: 'Which data structure follows First In, First Out?',
      options: ['Stack', 'Queue', 'Heap', 'Tree'],
      answer: 'Queue'
    },
    {
      skill: 'Object-Oriented Programming',
      question: 'Which OOP concept hides internal implementation details?',
      options: ['Encapsulation', 'Inheritance', 'Iteration', 'Compilation'],
      answer: 'Encapsulation'
    },
    {
      skill: 'Object-Oriented Programming',
      question: 'Which OOP concept allows a class to reuse another class properties?',
      options: ['Inheritance', 'Recursion', 'Iteration', 'Parsing'],
      answer: 'Inheritance'
    },
    {
      skill: 'SQL',
      question: 'Which SQL command modifies existing records?',
      options: ['UPDATE', 'CREATE', 'SELECT', 'DROP'],
      answer: 'UPDATE'
    },
    {
      skill: 'Git',
      question: 'Which command displays the commit history?',
      options: ['git log', 'git add', 'git init', 'git status'],
      answer: 'git log'
    }
  ],

  'Java Developer': [
    {
      skill: 'Java',
      question: 'Which keyword is used to inherit a class in Java?',
      options: ['implements', 'extends', 'inherits', 'superclass'],
      answer: 'extends'
    },
    {
      skill: 'Java',
      question: 'Which keyword prevents a class from being inherited?',
      options: ['static', 'final', 'private', 'abstract'],
      answer: 'final'
    },
    {
      skill: 'OOP',
      question: 'What is method overloading?',
      options: [
        'Same method name with different parameter lists',
        'Deleting a method',
        'Calling a method from another language',
        'Creating only private methods'
      ],
      answer: 'Same method name with different parameter lists'
    },
    {
      skill: 'OOP',
      question: 'Which keyword refers to the current object in Java?',
      options: ['this', 'super', 'self', 'current'],
      answer: 'this'
    },
    {
      skill: 'Collections Framework',
      question: 'Which Java collection does not allow duplicate elements?',
      options: ['List', 'Set', 'ArrayList', 'LinkedList'],
      answer: 'Set'
    },
    {
      skill: 'Collections Framework',
      question: 'Which collection stores key-value pairs?',
      options: ['Map', 'Queue', 'Stack', 'ArrayList'],
      answer: 'Map'
    },
    {
      skill: 'Exception Handling',
      question: 'Which block runs whether an exception occurs or not, in normal control flow?',
      options: ['try', 'catch', 'finally', 'throw'],
      answer: 'finally'
    },
    {
      skill: 'Exception Handling',
      question: 'Which keyword explicitly throws an exception?',
      options: ['throws', 'throw', 'catch', 'final'],
      answer: 'throw'
    },
    {
      skill: 'JDBC',
      question: 'What is JDBC used for?',
      options: [
        'Connecting Java applications to databases',
        'Creating CSS layouts',
        'Building Android screens only',
        'Managing Git branches'
      ],
      answer: 'Connecting Java applications to databases'
    },
    {
      skill: 'SQL',
      question: 'Which SQL clause sorts query results?',
      options: ['ORDER BY', 'GROUP BY', 'WHERE', 'JOIN'],
      answer: 'ORDER BY'
    }
  ],

  'Data Analyst': [
    {
      skill: 'Excel',
      question: 'Which Excel function calculates the average of numbers?',
      options: ['SUM()', 'AVERAGE()', 'COUNT()', 'MAX()'],
      answer: 'AVERAGE()'
    },
    {
      skill: 'Excel',
      question: 'Which Excel feature summarizes and groups large datasets?',
      options: ['PivotTable', 'WordArt', 'Mail Merge', 'Page Break'],
      answer: 'PivotTable'
    },
    {
      skill: 'SQL',
      question: 'Which SQL clause filters rows before grouping?',
      options: ['HAVING', 'WHERE', 'ORDER BY', 'DISTINCT'],
      answer: 'WHERE'
    },
    {
      skill: 'SQL',
      question: 'Which SQL function counts rows?',
      options: ['COUNT()', 'SUM()', 'AVG()', 'ROUND()'],
      answer: 'COUNT()'
    },
    {
      skill: 'Python',
      question: 'Which Python library is commonly used for tabular data analysis?',
      options: ['Pandas', 'Turtle', 'Pygame', 'Tkinter'],
      answer: 'Pandas'
    },
    {
      skill: 'Python',
      question: 'Which Python library is commonly used for numerical arrays?',
      options: ['NumPy', 'Flask', 'Django', 'BeautifulSoup'],
      answer: 'NumPy'
    },
    {
      skill: 'Power BI',
      question: 'What is Power BI mainly used for?',
      options: [
        'Business intelligence and data visualization',
        'Video editing',
        'Operating system installation',
        'Game development'
      ],
      answer: 'Business intelligence and data visualization'
    },
    {
      skill: 'Power BI',
      question: 'Which language is commonly used for measures in Power BI?',
      options: ['DAX', 'HTML', 'CSS', 'PHP'],
      answer: 'DAX'
    },
    {
      skill: 'Statistics',
      question: 'What is the median?',
      options: [
        'The middle value in ordered data',
        'The largest value',
        'The sum of values',
        'The difference between maximum and minimum'
      ],
      answer: 'The middle value in ordered data'
    },
    {
      skill: 'Data Visualization',
      question: 'Which chart is useful for showing trends over time?',
      options: ['Line chart', 'Pie chart', 'Treemap', 'Gauge only'],
      answer: 'Line chart'
    }
  ],

  'Data Scientist': [
    {
      skill: 'Python',
      question: 'Which keyword is used to create a Python class?',
      options: ['class', 'object', 'struct', 'define'],
      answer: 'class'
    },
    {
      skill: 'Python',
      question: 'Which statement imports the NumPy library using the common alias?',
      options: [
        'import numpy as np',
        'include numpy',
        'using numpy',
        'load numpy as python'
      ],
      answer: 'import numpy as np'
    },
    {
      skill: 'Statistics',
      question: 'What does standard deviation measure?',
      options: [
        'Spread of data values',
        'Number of columns',
        'The largest value only',
        'The data type'
      ],
      answer: 'Spread of data values'
    },
    {
      skill: 'Statistics',
      question: 'What is the mode of a dataset?',
      options: [
        'The most frequently occurring value',
        'The middle value',
        'The average value',
        'The smallest value'
      ],
      answer: 'The most frequently occurring value'
    },
    {
      skill: 'Machine Learning',
      question: 'Which task predicts a continuous numerical value?',
      options: ['Regression', 'Classification', 'Clustering', 'Sorting'],
      answer: 'Regression'
    },
    {
      skill: 'Machine Learning',
      question: 'What is overfitting?',
      options: [
        'A model learns training data too closely and generalizes poorly',
        'A model has no training data',
        'A model always predicts zero',
        'A dataset contains no features'
      ],
      answer: 'A model learns training data too closely and generalizes poorly'
    },
    {
      skill: 'Pandas',
      question: 'Which Pandas function reads a CSV file?',
      options: ['read_csv()', 'open_csv()', 'load_table()', 'get_csv()'],
      answer: 'read_csv()'
    },
    {
      skill: 'NumPy',
      question: 'Which NumPy function creates an array?',
      options: ['np.array()', 'np.table()', 'np.list()', 'np.frame()'],
      answer: 'np.array()'
    },
    {
      skill: 'SQL',
      question: 'Which SQL keyword combines rows from related tables?',
      options: ['JOIN', 'SORT', 'INSERT', 'RENAME'],
      answer: 'JOIN'
    },
    {
      skill: 'Data Visualization',
      question: 'Which chart is commonly used to show the relationship between two numerical variables?',
      options: ['Scatter plot', 'Pie chart', 'Single-value card', 'Donut chart'],
      answer: 'Scatter plot'
    }
  ],

  'UI/UX Designer': [
    {
      skill: 'Figma',
      question: 'What is Figma mainly used for?',
      options: [
        'Interface design and prototyping',
        'Database management',
        'Server deployment',
        'Video compression'
      ],
      answer: 'Interface design and prototyping'
    },
    {
      skill: 'Figma',
      question: 'What is an Auto Layout feature in Figma used for?',
      options: [
        'Creating responsive layouts',
        'Writing SQL queries',
        'Editing audio',
        'Hosting websites'
      ],
      answer: 'Creating responsive layouts'
    },
    {
      skill: 'Wireframing',
      question: 'What is a wireframe?',
      options: [
        'A basic structure of a user interface',
        'A finished animation',
        'A database schema',
        'A programming language'
      ],
      answer: 'A basic structure of a user interface'
    },
    {
      skill: 'Wireframing',
      question: 'What is the main purpose of a low-fidelity wireframe?',
      options: [
        'Plan structure and layout',
        'Show final visual details',
        'Test server speed',
        'Write application logic'
      ],
      answer: 'Plan structure and layout'
    },
    {
      skill: 'Prototyping',
      question: 'What does an interactive prototype demonstrate?',
      options: [
        'How users move through an interface',
        'The database password',
        'The server hardware',
        'The source code compilation'
      ],
      answer: 'How users move through an interface'
    },
    {
      skill: 'Prototyping',
      question: 'Why do designers test prototypes?',
      options: [
        'To identify usability issues early',
        'To increase file size',
        'To remove all colors',
        'To replace user research'
      ],
      answer: 'To identify usability issues early'
    },
    {
      skill: 'User Research',
      question: 'Which method helps understand users’ needs and experiences?',
      options: ['User interviews', 'Code minification', 'Database indexing', 'Server logging'],
      answer: 'User interviews'
    },
    {
      skill: 'Visual Design',
      question: 'What does visual hierarchy help users understand?',
      options: [
        'Which elements are most important',
        'How a server is installed',
        'How a database is backed up',
        'How code is compiled'
      ],
      answer: 'Which elements are most important'
    },
    {
      skill: 'Typography',
      question: 'What does typography primarily concern?',
      options: [
        'The arrangement and appearance of text',
        'Image compression',
        'Database tables',
        'Network protocols'
      ],
      answer: 'The arrangement and appearance of text'
    },
    {
      skill: 'Responsive Design',
      question: 'What is responsive design?',
      options: [
        'Design that adapts to different screen sizes',
        'Design that only works on desktops',
        'Design without text',
        'Design that requires a fixed screen width'
      ],
      answer: 'Design that adapts to different screen sizes'
    }
  ],

  'DevOps Engineer': [
    {
      skill: 'Linux',
      question: 'Which Linux command lists files and directories?',
      options: ['ls', 'cd', 'pwd', 'mkdir'],
      answer: 'ls'
    },
    {
      skill: 'Linux',
      question: 'Which Linux command displays the current directory?',
      options: ['pwd', 'rm', 'touch', 'cat'],
      answer: 'pwd'
    },
    {
      skill: 'Git',
      question: 'Which command creates a new Git branch?',
      options: ['git branch', 'git status', 'git push', 'git log'],
      answer: 'git branch'
    },
    {
      skill: 'Git',
      question: 'Which command combines changes from one branch into another?',
      options: ['git merge', 'git clone', 'git init', 'git add'],
      answer: 'git merge'
    },
    {
      skill: 'Docker',
      question: 'What is Docker primarily used for?',
      options: [
        'Building and running containers',
        'Designing user interfaces',
        'Writing SQL queries',
        'Editing spreadsheets'
      ],
      answer: 'Building and running containers'
    },
    {
      skill: 'Docker',
      question: 'Which command lists running Docker containers?',
      options: [
        'docker ps',
        'docker start-all',
        'docker images-only',
        'docker list-files'
      ],
      answer: 'docker ps'
    },
    {
      skill: 'Jenkins',
      question: 'What is Jenkins commonly used for?',
      options: [
        'Continuous integration and delivery automation',
        'Graphic design',
        'Database storage only',
        'Mobile photography'
      ],
      answer: 'Continuous integration and delivery automation'
    },
    {
      skill: 'CI/CD',
      question: 'What does CI stand for in CI/CD?',
      options: [
        'Continuous Integration',
        'Computer Installation',
        'Code Inspection only',
        'Central Interface'
      ],
      answer: 'Continuous Integration'
    },
    {
      skill: 'AWS',
      question: 'What is Amazon EC2 used for?',
      options: [
        'Providing virtual servers in the cloud',
        'Designing logos',
        'Managing Git commits',
        'Creating CSS animations'
      ],
      answer: 'Providing virtual servers in the cloud'
    },
    {
      skill: 'Kubernetes',
      question: 'What is Kubernetes primarily used for?',
      options: [
        'Container orchestration',
        'Image editing',
        'Spreadsheet calculations',
        'Writing frontend CSS'
      ],
      answer: 'Container orchestration'
    }
  ]
};

export default roleAssessmentData;
