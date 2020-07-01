package main

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
)

var dbInstance = dynamodb.New(session.New(), aws.NewConfig().WithRegion("us-east-2"))

func putItem(evt *event) error {
	input := &dynamodb.PutItemInput{
		TableName: aws.String("events"),
		Item: map[string]*dynamodb.AttributeValue{
			"username": {
				S: aws.String(evt.Username),
			},
			"eventId": {
				S: aws.String(evt.EventID),
			},
			"description": {
				S: aws.String(evt.Description),
			},
			"name": {
				S: aws.String(evt.Name),
			},
			"status": {
				S: aws.String(evt.Status),
			},
			"start_time": {
				S: aws.String(evt.StartTime),
			},
			"stop_time": {
				S: aws.String(evt.StopTime),
			},
		},
	}

	_, err := dbInstance.PutItem(input)
	return err
}
