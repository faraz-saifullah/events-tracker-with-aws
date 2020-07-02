package main

import (
	"log"
	"net/http"
	"os"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

var errorLogger = log.New(os.Stderr, "ERROR ", log.Llongfile)

func delete(req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	//TODO ADD MORE REQUEST VALIDATIONS

	EventID := req.QueryStringParameters["eventId"]
	if EventID == "" {
		return clientError(http.StatusBadRequest)
	}

	err := deleteItem(EventID)
	if err != nil {
		return serverError(err)
	}

	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Headers: map[string]string{
			"Access-Control-Allow-Origin":  "*",
			"access-control-allow-methods": "GET,OPTIONS,POST,PUT,DELETE",
		},
		Body: "Event " + EventID + " Deleted Successfully!",
	}, nil
}

func serverError(err error) (events.APIGatewayProxyResponse, error) {
	errorLogger.Println(err.Error())

	return events.APIGatewayProxyResponse{
		StatusCode: http.StatusInternalServerError,
		Headers: map[string]string{
			"Access-Control-Allow-Origin":  "*",
			"access-control-allow-methods": "GET,OPTIONS,POST,PUT,DELETE",
		},
		Body: http.StatusText(http.StatusInternalServerError),
	}, nil
}

func clientError(status int) (events.APIGatewayProxyResponse, error) {
	return events.APIGatewayProxyResponse{
		StatusCode: status,
		Headers: map[string]string{
			"Access-Control-Allow-Origin":  "*",
			"access-control-allow-methods": "GET,OPTIONS,POST,PUT,DELETE",
		},
		Body: http.StatusText(status),
	}, nil
}

func main() {
	lambda.Start(delete)
}
