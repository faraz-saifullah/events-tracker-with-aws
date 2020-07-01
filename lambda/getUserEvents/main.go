package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

type event struct {
	Username    string `json:"username"`
	EventID     string `json:"eventId"`
	Description string `json:"description"`
	Name        string `json:"name"`
	Status      string `json:"status"`
	StartTime   string `json:"start_time"`
	StopTime    string `json:"stop_time"`
}

var errorLogger = log.New(os.Stderr, "ERROR ", log.Llongfile)

func show(req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	username := req.QueryStringParameters["username"]
	evtObj, err := getItem(username)
	if err != nil {
		return serverError(err)
	}
	if evtObj == nil {
		return clientError(http.StatusNotFound)
	}

	js, err := json.Marshal(evtObj)
	if err != nil {
		return serverError(err)
	}

	return events.APIGatewayProxyResponse{
		StatusCode: http.StatusOK,
		Body:       string(js),
	}, nil
}

func serverError(err error) (events.APIGatewayProxyResponse, error) {
	errorLogger.Println(err.Error())

	return events.APIGatewayProxyResponse{
		StatusCode: http.StatusInternalServerError,
		Body:       http.StatusText(http.StatusInternalServerError),
	}, nil
}

func clientError(status int) (events.APIGatewayProxyResponse, error) {
	return events.APIGatewayProxyResponse{
		StatusCode: status,
		Body:       http.StatusText(status),
	}, nil
}

func main() {
	lambda.Start(show)
}
