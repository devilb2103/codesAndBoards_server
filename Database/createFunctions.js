const { api_key } = require('../Models/api_key');
const { member } = require('../Models/member');
const { question } = require('../Models/question');
const { quiz } = require('../Models/quiz');
const {
  generateQuestions,
  getRand,
  validateNameList,
} = require('../Utils/questionGenerator');
const { sequelize } = require('./setup');

const apiKeys = ['XNHQPD3M', 'TF5DJ4B8', '3ALR263E', 'PZEEZ9S7', 'YV65UQLM'];
const questionCount = 12;

async function createQuestions(res) {
  let a = [
    {
      description: 'The _____ is all there was and all there ever will be.',
      option_a: 'Bagel',
      option_b: 'universe',
      option_c: 'Milky way',
      option_d: 'Cosmos',
      correct_option: 4,
    },
    {
      description:
        'The ____ is a mass of comets that surround our solar system.',
      option_a: 'Oort cloud',
      option_b: 'Kulper belt',
      option_c: 'Gamow cloud',
      option_d: 'Perseus arm',
      correct_option: 1,
    },
    {
      description: 'what is the hottest a star can get?',
      option_a: '25,000 degrees celsius',
      option_b: '15,000 degrees celsius',
      option_c: '30 degrees celsius',
      option_d: '0 degree celsius',
      correct_option: 1,
    },
    {
      description: '____ was the 1st person to look through telescope',
      option_a: 'Copernicus',
      option_b: 'isaac newton',
      option_c: 'Galileo',
      option_d: 'spongebob square pants',
      correct_option: 3,
    },
    {
      description:
        'All recorded history makes up the last __ seconds of December 31st of the cosmic calendar.',
      option_a: '1000',
      option_b: '3,00,000',
      option_c: '2',
      option_d: '14',
      correct_option: 4,
    },
    {
      description: 'Where is our solar system located?',
      option_a: 'In the middle of the universe',
      option_b: 'in an outer arm of the milky way ',
      option_c: 'on the edge of the Andromeda galaxy',
      option_d: 'in the middle of the milky way',
      correct_option: 5,
    },
    {
      description: 'What type of galaxy is the milky way?',
      option_a: 'Elliptical',
      option_b: 'triangular',
      option_c: 'spiral',
      option_d: 'irregular',
      correct_option: 3,
    },
    {
      description: 'Where is the "Warm Breeze"?',
      option_a: 'Inside the solar system',
      option_b: 'On Mars and Venus',
      option_c: 'in the tropics',
      option_d: 'on the coast of Australia',
      correct_option: 1,
    },
    {
      description: 'Where is the sculpture "Fallen astronaut" located?',
      option_a: 'in Huston',
      option_b: 'in the baikonur spaceport',
      option_c: 'on the cape Canaveral',
      option_d: 'on the moon',
      correct_option: 4,
    },
    {
      description: 'which is the brightest star in the universe?',
      option_a: 'Sirius',
      option_b: 'Vega',
      option_c: 'Rigel',
      option_d: 'Betelgeuse',
      correct_option: 1,
    },
    {
      description:
        'A star that pulsates radially,changing both diameter  and temperature is called a',
      option_a: 'Quasars',
      option_b: 'Magnetars',
      option_c: 'Pulsars',
      option_d: 'cephid',
      correct_option: 1,
    },
    {
      description:
        'What is the second brightest star in the night time sky, after Sirius?',
      option_a: 'Arcturus',
      option_b: 'Canopus',
      option_c: 'Vega',
      option_d: 'Procyon',
      correct_option: 2,
    },
    {
      description: 'Which rover was the first to explore Mars?',
      option_a: 'Curiosity',
      option_b: 'Opportunity',
      option_c: 'Sojourner',
      option_d: 'Spirit',
      correct_option: 3,
    },
    {
      description:
        'What is the most common element (by mass) forming the planet Earth?',
      option_a: 'carbon',
      option_b: 'oxygen',
      option_c: 'iron',
      option_d: 'silicon',
      correct_option: 3,
    },
    {
      description: 'What does the colour of star indicates?',
      option_a: 'Distance from the Sun',
      option_b: 'Lighting or glow',
      option_c: 'Distance from the earth',
      option_d: 'Temperature',
      correct_option: 4,
    },
    {
      description:
        'Which of the following planet of the solar system associated with Goldilocks Zone?',
      option_a: 'Mars',
      option_b: 'Earth',
      option_c: 'Jupiter',
      option_d: 'Mercury',
      correct_option: 2,
    },
    {
      description: 'Pythagoras described cosmos as the',
      option_a: 'Black Hole',
      option_b: 'Evolution Theory',
      option_c: 'Big Bang Theory',
      option_d: 'Order of the Universe',
      correct_option: 4,
    },
    {
      description: 'All of space and time and its contents is the',
      option_a: 'Galaxy',
      option_b: 'Universe',
      option_c: 'Black Hole',
      option_d: 'Big Bang',
      correct_option: 2,
    },
    {
      description: 'The study of the cosmos is referred to as',
      option_a: 'Astrophysics',
      option_b: 'Theology',
      option_c: 'Universe',
      option_d: 'Cosmology',
      correct_option: 4,
    },
    {
      description: 'The cosmos has been described as the',
      option_a: 'Planetary system',
      option_b: 'Entire universe',
      option_c: 'Observable universe',
      option_d: 'Heavenly bodies',
      correct_option: 2,
    },
    {
      description:
        'The universe originally expanded from high or infinite density, this is a postulate of...',
      option_a: 'Astrophysics',
      option_b: 'Astronomy',
      option_c: 'The Big Bang Theory',
      option_d: 'Theological Astronomy',
      correct_option: 3,
    },
    {
      description:
        'the first celestial body to become visible in the sky at evening and is the last one to disappear from the sky at sunrise.',
      option_a: 'Mercury',
      option_b: 'Venus',
      option_c: 'Saturn',
      option_d: 'Neptune',
      correct_option: 2,
    },
    {
      description:
        '______ is one of the variants of Python that runs in a web browser :',
      option_a: 'PyPy',
      option_b: 'Jython',
      option_c: 'IronPython',
      option_d: 'Brython',
      correct_option: 1,
    },
    {
      description:
        'Python overtook ______ to be the most popular language taught in primary schools.',
      option_a: 'German',
      option_b: 'English',
      option_c: 'French',
      option_d: 'Spanish',
      correct_option: 3,
    },
    {
      description: 'Which of the following is not a concept of OOPS',
      option_a: 'Polymorphism',
      option_b: 'Abstraction',
      option_c: 'Compilation',
      option_d: 'Encapsulation ',
      correct_option: 3,
    },
    {
      description: 'which of the following is output command in cpp?',
      option_a: 'system.out.println()',
      option_b: 'printf()',
      option_c: 'cout>>',
      option_d: 'cout<<',
      correct_option: 4,
    },
    {
      description: 'What does this equation mean ? a != t',
      option_a: 'A is assinged t',
      option_b: 'A and t are equal',
      option_c: 'A is not equal to t',
      option_d: 'T is add to a',
      correct_option: 3,
    },
    {
      description: 'Which data structure uses LIFO?',
      option_a: 'Array',
      option_b: 'Int',
      option_c: 'Stacks',
      option_d: 'Queues',
      correct_option: 3,
    },
    {
      description: 'HTML stands for HyperText __________ Language.',
      option_a: 'Mark-up',
      option_b: 'Marker',
      option_c: 'Markup',
      option_d: 'Marking',
      correct_option: 3,
    },
    {
      description: 'Switch statement accepts _______.',
      option_a: 'Int',
      option_b: 'Char',
      option_c: 'Long',
      option_d: 'All of the mentioned',
      correct_option: 4,
    },
    {
      description: 'Which function overloads the >> operator?',
      option_a: 'more()',
      option_b: 'gt()',
      option_c: 'ge()',
      option_d: 'None of the above',
      correct_option: 4,
    },
    {
      description:
        'Which of the followings is/are automatically added to every class, if we do not write our own.',
      option_a: 'Copy Constructor',
      option_b: 'Assignment Operator',
      option_c: 'A constructor without any parameter',
      option_d: 'All of the above',
      correct_option: 4,
    },
    {
      description: 'Which of the following is a true about Binary Trees',
      option_a: 'Every binary tree is either complete or full.',
      option_b: 'Every complete binary tree is also a full binary tree.',
      option_c: 'Every full binary tree is also a complete binary tree.',
      option_d: 'None of the above',
      correct_option: 4,
    },
    {
      description: 'Which one is the first search engine in internet ?',
      option_a: 'Google ',
      option_b: 'Archie',
      option_c: 'Altavista',
      option_d: 'WAIS ',
      correct_option: 2,
    },
    {
      description:
        'Which of the following programming languages is used to create programmes like applets?',
      option_a: 'COBOL',
      option_b: 'C Language',
      option_c: 'Java',
      option_d: 'Basic',
      correct_option: 3,
    },
    {
      description: 'First Computer Virus is known as ',
      option_a: 'Rabbit ',
      option_b: 'Creeper Virus ',
      option_c: 'Elk Cloner ',
      option_d: 'SCA Virus ',
      correct_option: 2,
    },
    {
      description:
        'Which one programming language is exclusively used for artificial intelligence?',
      option_a: 'C',
      option_b: 'JAVA',
      option_c: 'J2EE',
      option_d: 'Prolog ',
      correct_option: 4,
    },
    {
      description:
        'Number of layers in OSI (Open System Interconnection) Model',
      option_a: '9',
      option_b: '3',
      option_c: '7',
      option_d: '11',
      correct_option: 3,
    },
    {
      description: 'Who Created the C programming language?',
      option_a: 'Ken Thompson',
      option_b: 'Dennis Ritchie',
      option_c: 'Robin Milner',
      option_d: 'Frieder Nake',
      correct_option: 2,
    },
    {
      description: 'Which one is the first word processor application?',
      option_a: 'MS Word',
      option_b: 'Apple i Work',
      option_c: 'Sun StarOffice',
      option_d: 'Word Star',
      correct_option: 4,
    },
    {
      description: 'Who developed the JAVA programming language?',
      option_a: 'James Gosling',
      option_b: 'Douglas Engelbart',
      option_c: 'Edmund M.Clarke',
      option_d: 'James D.Foley',
      correct_option: 1,
    },
    {
      description:
        'What type of software testing on the initial software validates the stability of an application to ensure the working of critical functions of the program?',
      option_a: 'Unit Testing',
      option_b: 'Smoke Testing',
      option_c: 'Stress Testing',
      option_d: 'White Box Testing',
      correct_option: 2,
    },
    {
      description: 'Which of the types of binary trees is weight-balanced?',
      option_a: 'AVL Tree',
      option_b: 'Red-Black Tree',
      option_c: 'Splay Tree',
      option_d: 'BB[ɑ]',
      correct_option: 4,
    },
  ];
  for (let i = 0; i < a.length; i++) {
    console.log(a[i]);
    let q = await question.create({
      description: a[i]['description'],
      option_a: a[i]['option_a'],
      option_b: a[i]['option_b'],
      option_c: a[i]['option_c'],
      option_d: a[i]['option_d'],
      correct_option: a[i]['correct_option'],
    });
  }
}

async function create_SampleQuestions(count, res) {
  try {
    for (let i = 0; i < count; i++) {
      let q = await question.create({
        description: `question description`,
        option_a: 'option_a',
        option_b: 'option_b',
        option_c: 'option_c',
        option_d: 'option_d',
        correct_option: getRand(4) + 1,
      });
    }
    res.status(200).send({
      status: true,
      message: `${count} questions created`,
    });
  } catch (err) {
    res.status(400).send({
      status: false,
      message: `could not create ${count} questions, ${err}`,
    });
  }
}

async function create_Members(users, res) {
  try {
    sequelize.transaction(async (transaction) => {
      // fetch member init data
      let x = validateNameList(users);
      if (!x[0]) {
        res.status(400).send({
          status: false,
          message: x[1],
        });
        return;
      } else {
        const latestMemberEntry = await member.count();
        let teamId = 0;
        if (!latestMemberEntry) {
          teamId = 1;
        } else {
          let latestTeamEntry = await member.max('team_id');
          let id1 = parseInt(latestTeamEntry) + 1;
          teamId = id1;
        }

        // create members
        for (let i = 0; i < users.length; i++) {
          const name = users[i];
          const memberObj = await member.create(
            {
              name: name,
              team_id: teamId,
            },
            {
              transaction: transaction,
            }
          );
        }
        // create quiz
        await create_Quiz(teamId, questionCount);

        // create key
        await create_api_Key(teamId);
        res.status(200).send({
          status: true,
          message: `created members ${users}`,
          teamId: teamId,
        });
      }
    });
  } catch (err) {
    res.status(400).send({
      status: false,
      message: `could not create members ${users}`,
    });
  }
}

async function create_Quiz(teamId, questionCount, transaction) {
  let questions = await generateQuestions(questionCount);
  const quizObj = await quiz.create(
    {
      team_id: teamId,
      question: questions,
    },
    {
      transaction: transaction,
    }
  );
}

async function create_api_Key(teamId, transaction) {
  let key = apiKeys[getRand(apiKeys.length)];
  const keyObj = await api_key.create(
    {
      key: key,
      team_id: teamId,
    },
    {
      transaction: transaction,
    }
  );
}

module.exports = {
  create_SampleQuestions: create_SampleQuestions,
  create_Members: create_Members,
  create_Quiz: create_Quiz,
  create_api_Key: create_api_Key,
  createQuestions: createQuestions,
};
