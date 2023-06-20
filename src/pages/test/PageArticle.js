import {Col, Container, Row} from "react-bootstrap";
import React from "react";
// import Editor from "rich-markdown-editor";

function PageArticle() {
    return (
        <div>
            <div style={{ background: 'rgb(245 245 250)' }}>
                <Container>
                    <Row>
                        <Col xs={12} className="mt-3">
                            <h2>Editor</h2>
                            {/*<Editor*/}
                            {/*    defaultValue="Hello world!"*/}
                            {/*/>*/}
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default PageArticle;
