package profit

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
	TpexProfitURL = stocks.TpexURL + "web/stock/3insti/daily_trade/3itrade_hedge_result.php?l=zh-tw&se=AL&t=D&d=%s"
)

var OtcProfitFields = []string{
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

// OtcProfit ...
type OtcProfit struct {
	FetchColly *colly.Collector
	Data       []*models.StockProfit
}

// OtcProfitDay ...
type OtcProfitDay struct {
	Date          string     `json:"reportDate"`
	Title         string     `json:"reportTitle"`
	Data          [][]string `json:"aaData"`
	ITotalRecords int64      `json:"iTotalRecords"`
}

// Init OtcStock
func (s *OtcProfit) Init() {
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
		profitDay := &OtcProfitDay{}
		err := json.Unmarshal(r.Body, profitDay)
		if err != nil {
			utilities.ZapLogger.Error(fmt.Sprintln(string(r.Body)))
		} else if profitDay.Data != nil {
			for _, ad := range profitDay.Data {
				sdi := &models.StockProfit{}
				sdi.SetByFields(OtcProfitFields, ad)
				converter.SetByField(sdi, "Date,R", profitDay.Date)
				s.Data = append(s.Data, sdi)
			}
		}
	})
	s.FetchColly.OnError(func(r *colly.Response, err error) {
		utilities.ZapLogger.Error(fmt.Sprintln(err))
	})
}

// Fetch OtcStock
func (s *OtcProfit) Fetch(d time.Time) {
	rocDate := d.AddDate(-1911, 0, 0)
	url := fmt.Sprintf(TpexProfitURL, url.QueryEscape(fmt.Sprintf("%d/%s", rocDate.Year(), rocDate.Format("01/02"))))
	utilities.ZapLogger.Info(fmt.Sprintln(url))
	if err := s.FetchColly.Visit(url); err != nil {
		utilities.ZapLogger.Error(fmt.Sprintln(err))
	}
}

// GetLast OtcStock
func (s *OtcProfit) GetLast(n int) []*models.StockProfit {
	// sort.Slice(s.Data[:], func(i, j int) bool {
	// 	return s.Data[i].Date.After(s.Data[j].Date)
	// })
	if n > len(s.Data) {
		n = len(s.Data)
	}
	return s.Data[0:n]
}

// GetData OtcStock
func (s *OtcProfit) GetData() []*models.StockProfit {
	return s.Data
}

// Wait OtcStock
func (s *OtcProfit) Wait() {
	s.FetchColly.Wait()
}

func (s *OtcProfit) ClearData() {
	s.Data = s.Data[:0]
}
