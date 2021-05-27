package profit

import (
	"encoding/json"
	"fmt"
	"strconv"
	"strings"
	"time"

	"github.com/NedHsu/golang-stock/models"
	"github.com/NedHsu/golang-stock/utilities"

	"github.com/gocolly/colly/v2"
)

const (
	//Profit daily sumary
	TwseProfitURL = MopsServer + "mops/web/ajax_t163sb06"
)

var TwseProfitFields = []string{
	"Date,2006-01-02",
	"StockCode",
	"StockName",
	"Revenue",
	"Gross",
	"OperatingProfit",
	"UntaxedNetProfit",
	"NetProfit"}

// TwseProfit ...
type TwseProfit struct {
	FetchColly *colly.Collector
	Data       []*models.StockProfit
}

// TwseProfitDay ...
type TwseProfitDay struct {
	Stat   string     `json:"stat"`
	Date   string     `json:"date"`
	Title  string     `json:"title"`
	Fields []string   `json:"fields"`
	Data   [][]string `json:"data"`
	Notes  []string   `json:"notes"`
}

// Init TwseStock
func (s *TwseProfit) Init() {
	s.FetchColly = colly.NewCollector(
		// colly.Debugger(&debug.LogDebugger{}),
		colly.Async(true),
	)
	utilities.CheckErr((s.FetchColly.Limit(&colly.LimitRule{
		DomainGlob:  "*",
		Parallelism: 1,
		Delay:       3 * time.Second,
	})))

	// s.FetchColly.OnResponse(func(r *colly.Response) {
	// 	fmt.Println(string(r.Body))
	// })

	s.FetchColly.OnHTML(`table`, func(e *colly.HTMLElement) {
		e.ForEach("tr", func(tri int, el *colly.HTMLElement) {
			// 排除 Header
			if tri < 1 {
				return
			}
			c := el.Attr("class")
			if c == "tblHead" {
				return
			}
			data := []string{
				el.Request.URL.RawQuery,
			}
			el.ForEach("td", func(tdi int, td *colly.HTMLElement) {
				data = append(data, strings.ReplaceAll(strings.TrimSpace(td.Text), ",", ""))
			})

			// 非正常資料
			if len(data) < 7 {
				return
			}
			sdi := &models.StockProfit{}
			sdi.SetByFields(TwseProfitFields, data)
			s.Data = append(s.Data, sdi)
		})
	})

	s.FetchColly.OnError(func(r *colly.Response, err error) {
		utilities.ZapLogger.Error(fmt.Sprintln(err))
	})
}

// Fetch TwseStock
func (s *TwseProfit) Fetch(d time.Time) {
	rocDate := d.AddDate(-1911, 0, 0)
	fmt.Println(int(rocDate.Month()))
	data := map[string]string{
		"encodeURIComponent": "1",
		"step":               "1",
		"firstin":            "1",
		"off":                "1",
		"TYPEK":              "sii",
		"year":               strconv.Itoa(rocDate.Year()),
		"season":             strconv.Itoa(int(rocDate.Month()) + 2/3),
	}
	dataJson, _ := json.Marshal(data)
	url := fmt.Sprintf(TwseProfitURL+"?%s", d.Format("2006-01-02"))
	utilities.ZapLogger.Info(url)
	utilities.ZapLogger.Info(string(dataJson))
	if err := s.FetchColly.Post(url, data); err != nil {
		utilities.ZapLogger.Error(fmt.Sprintln(err))
	}
}

// GetLast TwseStock
func (s *TwseProfit) GetLast(n int) []*models.StockProfit {
	// sort.Slice(s.Data[:], func(i, j int) bool {
	// 	return s.Data[i].Date.After(s.Data[j].Date)
	// })
	if n > len(s.Data) {
		n = len(s.Data)
	}
	return s.Data[0:n]
}

// GetData TwseStock
func (s *TwseProfit) GetData() []*models.StockProfit {
	return s.Data
}

// Wait TwseStock
func (s *TwseProfit) Wait() {
	s.FetchColly.Wait()
}

func (s *TwseProfit) ClearData() {
	s.Data = s.Data[:0]
}
