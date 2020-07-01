package main

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
)

var dbInstance = dynamodb.New(session.New(), aws.NewConfig().WithRegion("us-east-2"))

func getItem(username string) ([]event, error) {
	queryInput := &dynamodb.QueryInput{
		TableName: aws.String("events"),
		IndexName: aws.String("username-index"),
		KeyConditions: map[string]*dynamodb.Condition{
			"username": {
				ComparisonOperator: aws.String("EQ"),
				AttributeValueList: []*dynamodb.AttributeValue{
					{
						S: aws.String(username),
					},
				},
			},
		},
	}
	result, err := dbInstance.Query(queryInput)
	if err != nil {
		return nil, err
	}
	if result.Items == nil {
		return nil, nil
	}
	evtObj := []event{}
	err = dynamodbattribute.UnmarshalListOfMaps(result.Items, &evtObj)
	if err != nil {
		return nil, err
	}
	return evtObj, nil
}
