import React, {useContext} from 'react';
import {Button, Card, Icon, Image, Label, Popup} from 'semantic-ui-react';
import moment from 'moment';
import {Link} from 'react-router-dom';

import {AuthContext} from '../context/auth';
import LikeButton from '../components/LikeButton';

function PostCard({post: {body, createdAt, id, username, likeCount, commentCount, likes, comments }}) {
    const {user} = useContext(AuthContext);

    return (
        <Card fluid>
            <Card.Content>
                <Image floated="right" size="mini" src="https://react.semantic-ui.com/images/avatar/large/molly.png" />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton user={user} post={{id, likeCount, likes}} />

                <Button labelPosition="right" as={Link} to={`/posts/${id}`} title="Comment on this post">
                    <Button color="blue" basic>
                        <Icon name="comments" />
                    </Button>
                    <Label basic color="teal" pointing="left">
                        {commentCount}
                    </Label>
                </Button>

                {user && user.username === username && (
                     <Popup
                        trigger={
                            <Button as="div" color="red" icon title="Delete this post" floated="right">
                                <Icon name="trash" />
                            </Button>
                        }
                        content={<Button color='red' content='Delete this post?' onClick={() => {console.log('Delete Post')}} />}
                        on='click'
                        position='top center'
                    />
                )}
            </Card.Content>
        </Card>
    )
}

export default PostCard;
