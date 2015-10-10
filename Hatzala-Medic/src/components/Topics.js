/**
 * Topics options:
 *
 */
import React from 'react';
import Lists from 'material-ui/lib/lists';
import TopicsStore from '../stores/TopicsStore';
import forEach from 'lodash/collection/each';

const List = Lists.List;
const ListItem = Lists.ListItem;
const ListDivider = Lists.ListDivider;

class Topics extends React.Component {

    state = {
        topics: TopicsStore.getTopics()
    }

    render() {
        return (
            <List>
                {this.state.topics.map(this.renderListItem)}
            </List>
        );
    }

    renderListItem = (topic) => {
        var subTopics = topic.topics;
        var nestedItems = subTopics && subTopics.length > 0 ? [] : undefined;
        forEach(subTopics, (subTopic) => {
            nestedItems.push(this.renderListItem(subTopic));
        }, this);

        return (
            <ListItem key={topic.id} primaryText={topic.name} nestedItems={nestedItems}
                      onTouchTap={nestedItems === undefined ? this.onTopicSelection.bind(null, topic) : undefined}></ListItem>
        );
    }

    onTopicSelection = (selectedTopic, event) => {

    }
}

Topics.defaultProps = {};
Topics.propTypes = {};

export default Topics;