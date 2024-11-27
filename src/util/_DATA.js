let users = {
  sarahedo: {
    id: 'sarahedo',
    name: 'Sarah Edo',
    password:'1234567',
    avatarURL: '/images/avatars/gorilla.png',
    answers: {
      '8xf0y6ziyjabvozdd253nd': 'optionOne'
    },
    questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
  },
  nguyentiendung: {
    id: 'nguyentiendung',
    name: 'nguyentiendung',
    password:'1234567',
    avatarURL: '/images/avatars/hacker.png',
    answers: {
      vthrdm985a262al8qx3do: 'optionOne',
      xj352vofupe1dqz9emx13r: 'optionTwo'
    },
    questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do']
  },
  johndoe: {
    id: 'johndoe',
    name: 'John Doe',
    password:'123123',
    avatarURL: '/images/avatars/dog.png',
    answers: {
      xj352vofupe1dqz9emx13r: 'optionOne',
    },
    questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r']
  },
  zoshikanlu: {
    id: 'zoshikanlu',
    password:'pass246',
    name: 'Zenobia Oshikanlu',
    avatarURL: '/images/avatars/giraffe.png',
    answers: {
      "xthrdm985a262al8qx3do": 'optionOne',
    },
    questions: ['aj352vofupe1dqz9emx13r','xthrdm985a262al8qx3do','6ni6ok3ym7mf1p33lnez'],
  }
};

let questions = {
  '8xf0y6ziyjabvozdd253nd': {
    id: '8xf0y6ziyjabvozdd253nd',
    author: 'sarahedo',
    timestamp: 1467166872634,
    optionOne: {
      votes: ['sarahedo'],
      text: 'have horrible short term memory'
    },
    optionTwo: {
      votes: [],
      text: 'have horrible long term memory'
    }
  },
  '6ni6ok3ym7mf1p33lnez': {
    id: '6ni6ok3ym7mf1p33lnez',
    author: 'johndoe',
    timestamp: 1468479767190,
    optionOne: {
      votes: [],
      text: 'become a superhero'
    },
    optionTwo: {
      votes: ['johndoe', 'sarahedo'],
      text: 'become a supervillian'
    }
  },
  am8ehyc8byjqgar0jgpub9: {
    id: 'am8ehyc8byjqgar0jgpub9',
    author: 'sarahedo',
    timestamp: 1488579767190,
    optionOne: {
      votes: [],
      text: 'be telekinetic'
    },
    optionTwo: {
      votes: ['sarahedo'],
      text: 'be telepathic'
    }
  },
  loxhs1bqm25b708cmbf3g: {
    id: 'loxhs1bqm25b708cmbf3g',
    author: 'nguyentiendung',
    timestamp: 1482579767190,
    optionOne: {
      votes: [],
      text: 'be a front-end developer'
    },
    optionTwo: {
      votes: ['sarahedo'],
      text: 'be a back-end developer'
    }
  },
  vthrdm985a262al8qx3do: {
    id: 'vthrdm985a262al8qx3do',
    author: 'nguyentiendung',
    timestamp: 1489579767190,
    optionOne: {
      votes: ['nguyentiendung'],
      text: 'find $50 yourself'
    },
    optionTwo: {
      votes: ['johndoe'],
      text: 'have your best friend find $500'
    }
  },
  xj352vofupe1dqz9emx13r: {
    id: 'xj352vofupe1dqz9emx13r',
    author: 'johndoe',
    timestamp: 1493579767190,
    optionOne: {
      votes: ['johndoe'],
      text: 'write JavaScript'
    },
    optionTwo: {
      votes: ['nguyentiendung'],
      text: 'write Swift'
    }
  },
  xthrdm985a262al8qx3do: {
    id: 'xthrdm985a262al8qx3do',
    author: 'zoshikanlu',
    timestamp: 1489579767190,
    optionOne: {
      votes: ['sarahedo'],
      text: 'take a course on ReactJS',
    },
    optionTwo: {
      votes: ['johndoe'],
      text: 'take a course on unit testing with Jest'
    }
  },
  aj352vofupe1dqz9emx13r: {
    id: 'aj352vofupe1dqz9emx13r',
    author: 'zoshikanlu',
    timestamp: 1493579767190,
    optionOne: {
      votes: ['nguyentiendung', 'zoshikanlu'],
      text: 'deploy to production once every two weeks',
    },
    optionTwo: {
      votes: ['sarahedo'],
      text: 'deploy to production once every month'
    }
  }
};

function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function _getUsers () {
  return new Promise((resolve) => {
    setTimeout(() => resolve({...users}), 1000)
  })
}

export function _getQuestions () {
  return new Promise((resolve) => {
    setTimeout(() => resolve({...questions}), 1000)
  })
}

function formatQuestion ({ optionOneText, optionTwoText, author }) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author: author.id,
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    }
  }
}

export function _saveQuestion (question) {
  return new Promise((resolve, reject) => {
    if (!question.optionOneText || !question.optionTwoText || !question.author) {
      reject("Please provide optionOneText, optionTwoText, and author");
    }

    const formattedQuestion = formatQuestion(question)
    setTimeout(() => {
      questions = {
        ...questions,
        [formattedQuestion.id]: formattedQuestion
      }

      resolve(formattedQuestion)
    }, 1000)
  })
}

export function _saveQuestionAnswer ({ authedUser, qid, answer }) {
  return new Promise((resolve, reject) => {
    if (!authedUser || !qid || !answer) {
      return reject("Error! Please provide all information");
    }

    if (!users[authedUser]) {
      return reject("Error! User does not exist");
    }

    if (!questions[qid]) {
      return reject("Error! Question does not exist");
    }

    setTimeout(() => {
      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          answers: {
            ...users[authedUser].answers,
            [qid]: answer
          }
        }
      }

      questions = {
        ...questions,
        [qid]: {
          ...questions[qid],
          [answer]: {
            ...questions[qid][answer],
            votes: questions[qid][answer].votes.concat([authedUser])
          }
        }
      }

      resolve(true)
    }, 500)
  })
}
