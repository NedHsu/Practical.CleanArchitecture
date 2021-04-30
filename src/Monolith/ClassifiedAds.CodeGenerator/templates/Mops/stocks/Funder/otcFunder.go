package funder

import (
	"encoding/json"
	"fmt"
	"net/url"
	"time"

	"github.com/NedHsu/golang-stock/models"
	"github.com/NedHsu/golang-stock/stocks"
	"github.com/NedHsu/golang-stock/utilities"
	"github.com/NedHsu/golang-stock/utilities/converter"

	"github.com/gocolly/colly/v2"
)

const (
	//Fund daily sumary
	TpexFunderURL = stocks.TpexURL + "web/stock/3insti/daily_trade/3itrade_hedge_result.php?l=zh-tw&se=AL&t=D&d=%s"
)

var OtcFunderFields = []string{
	"StockCode",
	"StockName",
	"ForeignBuy",
	"ForeignSell",
	"ForeignSum",
	"ForeignSelfBuy",
	"ForeignSelfSell",
	"ForeignSelfSum",
	"",
	"",
	"",
	"CreditBuy",
	"CreditSell",
	"CreditSum",
	"SelfBuySell",
	"SelfBuy",
	"SelfSell",
	"SelfSum",
	"SelfHedgingBuy",
	"SelfHedgingSell",
	"SelfHedgingSum",
	"",
	"",
	"Total",
	""}

// OtcFunder ...
type OtcFunder struct {
	FetchColly *colly.Collector
	Data       []*models.StockFunder
}

// OtcFunderDay ...
type OtcFunderDay struct {
	Date          string     `json:"reportDate"`
	Title         string     `json:"reportTitle"`
	Data          [][]string `json:"aaData"`
	ITotalRecords int64      `json:"iTotalRecords"`
}

// Init OtcStock
func (s *OtcFunder) Init() {
	s.FetchColly = colly.NewCollector(
		// colly.Debugger(&debug.LogDebugger{}),
		colly.Async(true),
	)
	utilities.CheckErr((s.FetchColly.Limit(&colly.LimitRule{
		DomainGlob:  "*",
		Parallelism: 1,
		Delay:       3 * time.Second,
	})))
	s.FetchColly.OnResponse(func(r *colly.Response) {
		funderDay := &OtcFunderDay{}
		err := json.Unmarshal(r.Body, funderDay)
		if err != nil {
			utilities.ZapLogger.Error(fmt.Sprintln(string(r.Body)))
		} else if funderDay.Data != nil {
			for _, ad := range funderDay.Data {
				sdi := &models.StockFunder{}
				sdi.SetByFields(OtcFunderFields, ad)
				converter.SetByField(sdi, "Date,R", funderDay.Date)
				s.Data = append(s.Data, sdi)
			}
		}
	})
	s.FetchColly.OnError(func(r *colly.Response, err error) {
		utilities.ZapLogger.Error(fmt.Sprintln(err))
	})
}

// Fetch OtcStock
func (s *OtcFunder) Fetch(d time.Time) {
	rocDate := d.AddDate(-1911, 0, 0)
	url := fmt.Sprintf(TpexFunderURL, url.QueryEscape(fmt.Sprintf("%d/%s", rocDate.Year(), rocDate.Format("01/02"))))
	utilities.ZapLogger.Info(fmt.Sprintln(url))
	if err := s.FetchColly.Visit(url); err != nil {
		utilities.ZapLogger.Error(fmt.Sprintln(err))
	}
}

// GetLast OtcStock
func (s *OtcFunder) GetLast(n int) []*models.StockFunder {
	// sort.Slice(s.Data[:], func(i, j int) bool {
	// 	return s.Data[i].Date.After(s.Data[j].Date)
	// })
	if n > len(s.Data) {
		n = len(s.Data)
	}
	return s.Data[0:n]
}

// GetData OtcStock
func (s *OtcFunder) GetData() []*models.StockFunder {
	return s.Data
}

// Wait OtcStock
func (s *OtcFunder) Wait() {
	s.FetchColly.Wait()
}

func (s *OtcFunder) ClearData() {
	s.Data = s.Data[:0]
}
