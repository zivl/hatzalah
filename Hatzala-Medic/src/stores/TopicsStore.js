import EventEmitter from 'events';
import AppDispatcher from '../dispatchers/AppDispatcher';

var topics = [
    {
        id: 'cpr', name: 'החייאה', topics: [
        {id: 'cpr-children', name: 'ילדים'},
        {id: 'cpr-adult', name: 'מבוגרים'}
    ]
    },
    {
        id: 'blood', name: 'מחלות כלי דם', topics: [
        {id: 'blood-pressure', name: 'יתר לחץ-דם'}
    ]
    },
    {
        id: 'trauma',
        name: 'טראומה',
        topics: [{id: 'head-trauma', name: 'פגיעות ראש'}, {
            id: 'limb-trauma',
            name: 'חבלות בגפיים'
        }, {id: 'car-accident', name: 'תאונות דרכים'}]
    },
    {
        id: 'breath', name: 'מחלות נשימה', topics: [
        {id: 'asthma', name: 'אסטמה'},
        {id: 'copd', name: 'COPD'}
    ]
    },
    {
        id: 'sugar', name: 'מחלות סוכר', topics: [
        {id: 'hyperglycemia', name: 'היפרגליקמיה'},
        {id: 'hypoglycemia', name: 'היפוגליקמיה'}
    ]
    }
];

class TopicsStore extends EventEmitter {

    getTopics() {
        return topics;
    }

}

const instance = new TopicsStore();

TopicsStore.dispatchToken = AppDispatcher.register((action) => {

    switch (action.actionType) {

    }

});

export default instance;