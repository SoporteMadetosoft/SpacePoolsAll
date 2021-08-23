import React from 'react'
import { Card, CardBody, FormGroup, Row, Col, Form } from 'reactstrap'
import { ActionButtons } from '../actionButtons/ActionButtons'
import { CHeader } from '../CHeader'
import { ContentForm } from '../CustomForms/ContentForm'

export const AddFormLayout = ({customTitle}) => {
    return (
    <Card>
      <CHeader customTitle={customTitle} />

      <CardBody>
        <Form>
          <Row>
            <ContentForm />
            <Col>
              <FormGroup>
                <ActionButtons />
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
    )
}
