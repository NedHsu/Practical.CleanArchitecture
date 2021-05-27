package profit

import (
	"time"

	"github.com/NedHsu/golang-stock/models"
)

const (
	MopsServer = "https://mops.twse.com.tw/"
)

type IProfit interface {
	Init()
	Fetch(time.Time)
	GetData() []*models.StockProfit
	Wait()
	ClearData()
}

// GetProfitInstance ...
func GetProfitInstance(ex string) IProfit {
	var s IProfit
	switch ex {
	case "tse":
		s = &TwseProfit{}
	case "otc":
		s = &OtcProfit{}
	}
	return s
}
