package main

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
)

var dbInstance = dynamodb.New(session.New(), aws.NewConfig().WithRegion("us-east-2"))

func deleteItem(EventID string) error {
	input := &dynamodb.DeleteItemInput{
		Key: map[string]*dynamodb.AttributeValue{
			"eventId": {
				S: aws.String(EventID),
			},
		},
		TableName: aws.String("events"),
	}

	_, err := dbInstance.DeleteItem(input)
	return err
}
