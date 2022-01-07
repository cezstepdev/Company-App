import {put, takeEvery} from 'redux-saga/effects';
import axios from "axios";

const delay = (ms) => new Promise(res => setTimeout(res, ms));

let conversations = [
    {
        id: '1',
        imageUrl: require('../../images/profiles/daryl.png').default,
        imageAlt: 'Daryl Duckmanton',
        recipient: 'Daryl Duckmanton',
        createdAt: 'Apr 16',
        latestMessage: 'This is a message',
        messages: [
            {
                imageUrl: null,
                imageAlt: null,
                message: 'Ok then',
                createdAt: 'Apr 16',
                isMyMessage: true
            },
            {
                imageUrl: require('../../images/profiles/daryl.png').default,
                imageAlt: 'Daryl Duckmanton',
                message: `
                    Yeah I think it's best we do that. Otherwise things won't work well at all. 
                    I'm adding more text here to test the sizing of the speech bubble and the 
                    wrapping of it too.
                `,
                createdAt: 'Apr 16',
                isMyMessage: false
            },
            {
                imageUrl: null,
                imageAlt: null,
                message: 'Maybe we can use Jim\'s studio.',
                createdAt: 'Apr 15',
                isMyMessage: true
            },
            {
                imageUrl: require('../../images/profiles/daryl.png').default,
                imageAlt: 'Daryl Duckmanton',
                message: `
                    All I know is where I live it's too hard
                    to record because of all the street noise.
                `,
                createdAt: 'Apr 15',
                isMyMessage: false
            },
            {
                imageUrl: null,
                imageAlt: null,
                message: `
                    Well we need to work out sometime soon where
                    we really want to record our video course.
                `,
                createdAt: 'Apr 15',
                isMyMessage: true
            },
            {
                imageUrl: require('../../images/profiles/daryl.png').default,
                imageAlt: 'Daryl Duckmanton',
                message: `
                    I'm just in the process of finishing off the
                    last pieces of material for the course.
                `,
                createdAt: 'Apr 15',
                isMyMessage: false
            },
            {
                imageUrl: null,
                imageAlt: null,
                message: 'How\'s it going?',
                createdAt: 'Apr 13',
                isMyMessage: true
            },
            {
                imageUrl: require('../../images/profiles/daryl.png').default,
                imageAlt: 'Daryl Duckmanton',
                message: ' Hey mate what\'s up?',
                createdAt: 'Apr 13',
                isMyMessage: false
            },
            {
                imageUrl: null,
                imageAlt: null,
                message: 'Hey Daryl?',
                createdAt: 'Apr 13',
                isMyMessage: true
            }
        ]
    },
    {
        id: '2',
        imageUrl: require('../../images/profiles/kim.jpeg').default,
        imageAlt: 'Kim O\'Neil',
        recipient: 'Kim O\'Neil',
        createdAt: 'Oct 20',
        latestMessage: 'Ok fair enough. Well good talking to you.',
        messages: [
            {
                imageUrl: null,
                imageAlt: null,
                message: 'Ok fair enough. Well good talking to you.',
                createdAt: 'Oct 20',
                isMyMessage: true
            },
            {
                imageUrl: require('../../images/profiles/kim.jpeg').default,
                imageAlt: 'Kim O\'Neil',
                message: `
                    Not sure exactly yet. It will be next year sometime. Probably late.
                `,
                createdAt: 'Oct 20',
                isMyMessage: false
            },
            {
                imageUrl: null,
                imageAlt: null,
                message: 'Yeah I know. But oh well. So when is the big date?',
                createdAt: 'Oct 19',
                isMyMessage: true
            },
            {
                imageUrl: require('../../images/profiles/kim.jpeg').default,
                imageAlt: 'Kim O\'Neil',
                message: `
                    Well I know you like doing that stuff. But honestly I think
                    you are already really talented. It's a shame you haven't found
                    what you are looking for yet.
                `,
                createdAt: 'Oct 19',
                isMyMessage: false
            },
            {
                imageUrl: null,
                imageAlt: null,
                message: `
                    I'm doing ok. Just working on building some applications to
                    bulk up my resume, so I can get a better job.
                `,
                createdAt: 'Oct 19',
                isMyMessage: true
            },
            {
                imageUrl: require('../../images/profiles/kim.jpeg').default,
                imageAlt: 'Kim O\'Neil',
                message: `
                    I've just been really busy at work myself, looking to get
                    married sometime next year too. How are you going?
                `,
                createdAt: 'Oct 19',
                isMyMessage: false
            },
            {
                imageUrl: null,
                imageAlt: null,
                message: 'Yes it has been a little while',
                createdAt: 'Oct 19',
                isMyMessage: true
            },
            {
                imageUrl: require('../../images/profiles/kim.jpeg').default,
                imageAlt: 'Kim O\'Neil',
                message: 'Hey!!!! Have not spoken to you for a while',
                createdAt: 'Oct 19',
                isMyMessage: false
            },
            {
                imageUrl: null,
                imageAlt: null,
                message: 'Hi Kim?',
                createdAt: 'Oct 19',
                isMyMessage: true
            }
        ]
    },
    {
        id: '3',
        imageUrl: require('../../images/profiles/john.jpeg').default,
        imageAlt: 'John Anderson',
        recipient: 'John Anderson',
        createdAt: '1 week ago',
        latestMessage: 'Yes I love how Python does that',
        messages: [
            {
                imageUrl: null,
                imageAlt: null,
                message: 'Hi',
                createdAt: '1 week ago',
                isMyMessage: true
            }
        ]
    },
    {
        id: '4',
        imageUrl: require('../../images/profiles/ben.png').default,
        imageAlt: 'Ben Smith',
        recipient: 'Ben Smith',
        createdAt: '2:49 PM',
        latestMessage: 'Yeah Miami Heat are done',
        messages: [
            {
                imageUrl: null,
                imageAlt: null,
                message: 'Hi',
                createdAt: '2:49',
                isMyMessage: true
            }
        ]
    },
    {
        id: '5',
        imageUrl: require('../../images/profiles/douglas.png').default,
        imageAlt: 'Douglas Johannasen',
        recipient: 'Douglas Johannasen',
        createdAt: '6:14 PM',
        latestMessage: 'No it does not',
        messages: [
            {
                imageUrl: null,
                imageAlt: null,
                message: 'Hi',
                createdAt: '6:14 PM',
                isMyMessage: true
            }
        ]
    },
    {
        id: '6',
        imageUrl: require('../../images/profiles/jacob.png').default,
        imageAlt: 'Jacob Manly',
        recipient: 'Jacob Manly',
        createdAt: '3 secs ago',
        latestMessage: 'Just be very careful doing that',
        messages: [
            {
                imageUrl: null,
                imageAlt: null,
                message: 'Hi',
                createdAt: '3 secs ago',
                isMyMessage: true
            }
        ]
    },
    {
        id: '7',
        imageUrl: require('../../images/profiles/stacey.jpeg').default,
        imageAlt: 'Stacey Wilson',
        recipient: 'Stacey Wilson',
        createdAt: '30 mins ago',
        latestMessage: 'Awesome!!! Congratulations!!!!',
        messages: [
            {
                imageUrl: null,
                imageAlt: null,
                message: 'Hi',
                createdAt: '30 mins ago',
                isMyMessage: true
            }
        ]
    },
    {
        id: '8',
        imageUrl: require('../../images/profiles/stan.jpeg').default,
        imageAlt: 'Stan George',
        recipient: 'Stan George',
        createdAt: '1 week ago',
        latestMessage: 'Good job',
        messages: [
            {
                imageUrl: null,
                imageAlt: null,
                message: 'Hi',
                createdAt: '1 week ago',
                isMyMessage: true
            }
        ]
    },
    {
        id: '9',
        imageUrl: require('../../images/profiles/sarah.jpeg').default,
        imageAlt: 'Sarah Momes',
        recipient: 'Sarah Momes',
        createdAt: '1 year ago',
        latestMessage: 'Thank you. I appreciate that.',
        messages: [
            {
                imageUrl: null,
                imageAlt: null,
                message: 'Hi',
                createdAt: '1 year ago',
                isMyMessage: true
            }
        ]
    }
];

export const conversationsSaga = function* () {
    let user = localStorage.getItem('username');
    const config = {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    };

    // while (true) {
        axios.get('https://company-manager-api.herokuapp.com/api/v1/conversation/' + user, config).then(
            res => {
                if (res.data.length > 0)
                    conversations = res.data;
            }
        );

        yield delay(1000);
        yield put({
            type: 'CONVERSATIONS_LOADED',
            payload: {
                conversations,
                selectedConversation: conversations[0]
            }
        });
    // }
}

export function* watchGetConversationsAsync() {
    yield takeEvery('CONVERSATIONS_REQUESTED', conversationsSaga);
}