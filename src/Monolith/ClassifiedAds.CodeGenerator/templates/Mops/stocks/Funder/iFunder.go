package funder

import (
	"time"

	"github.com/NedHsu/golang-stock/models"
)

type IFunder interface {
	Init()
	Fetch(time.Time)
	GetData() []*models.StockFunder
	Wait()
	ClearData()
}

// GetFunderInstance ...
func GetFunderInstance(ex string) IFunder {
	var s IFunder
	switch ex {
	case "tse":
		s = &TwseFunder{}
	case "otc":
		s = &OtcFunder{}
	}
	return s
}
