package funder

import (
	"encoding/json"
	"fmt"
	"strings"
	"time"

	"github.com/NedHsu/golang-stock/models"
	"github.com/NedHsu/golang-stock/stocks"
	"github.com/NedHsu/golang-stock/utilities"
	"github.com/NedHsu/golang-stock/utilities/converter"

	"github.com/gocolly/colly/v2"
)

const (
	//Funder daily sumary
	TwseFunderURL = stocks.TwseURL + "fund/T86?response=json&date=%s&selectType=ALL"
)

var TwseFunderFields = []string{
	"StockCode",
	"StockName",
	"ForeignBuy",
	"ForeignSell",
	"ForeignSum",
	"ForeignSelfBuy",
	"ForeignSelfSell",
	"ForeignSelfSum",
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
	"Total"}

// TwseFunder ...
type TwseFunder struct {
	FetchColly *colly.Collector
	Data       []*models.StockFunder
}

// TwseFunderDay ...
type TwseFunderDay struct {
	Stat   string     `json:"stat"`
	Date   string     `json:"date"`
	Title  string     `json:"title"`
	Fields []string   `json:"fields"`
	Data   [][]string `json:"data"`
	Notes  []string   `json:"notes"`
}

// Init TwseStock
func (s *TwseFunder) Init() {
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
		funderDay := &TwseFunderDay{}
		err := json.Unmarshal(r.Body, funderDay)
		if err != nil {
			utilities.ZapLogger.Error(fmt.Sprintln(string(r.Body)))
		} else if funderDay.Data != nil {
			for _, ad := range funderDay.Data {
				sdi := &models.StockFunder{}
				sdi.SetByFields(TwseFunderFields, ad)
				sdi.StockName = strings.Trim(sdi.StockName, " ")
				converter.SetByField(sdi, "Date,20060102", funderDay.Date)
				s.Data = append(s.Data, sdi)
			}
		}
	})
	s.FetchColly.OnError(func(r *colly.Response, err error) {
		utilities.ZapLogger.Error(fmt.Sprintln(err))
	})
}

// Fetch TwseStock
func (s *TwseFunder) Fetch(d time.Time) {
	url := fmt.Sprintf(TwseFunderURL, d.Format("20060102"))
	utilities.ZapLogger.Info(fmt.Sprintln(url))
	if err := s.FetchColly.Visit(url); err != nil {
		utilities.ZapLogger.Error(fmt.Sprintln(err))
	}
}

// GetLast TwseStock
func (s *TwseFunder) GetLast(n int) []*models.StockFunder {
	// sort.Slice(s.Data[:], func(i, j int) bool {
	// 	return s.Data[i].Date.After(s.Data[j].Date)
	// })
	if n > len(s.Data) {
		n = len(s.Data)
	}
	return s.Data[0:n]
}

// GetData TwseStock
func (s *TwseFunder) GetData() []*models.StockFunder {
	return s.Data
}

// Wait TwseStock
func (s *TwseFunder) Wait() {
	s.FetchColly.Wait()
}

func (s *TwseFunder) ClearData() {
	s.Data = s.Data[:0]
}
