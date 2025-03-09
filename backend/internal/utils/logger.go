package utils

import (
	"log"
	"os"
)

var Logger *log.Logger

func InitLogger() {
	Logger = log.New(os.Stdout, "[SERVEASE] ", log.LstdFlags|log.Lshortfile)
} 