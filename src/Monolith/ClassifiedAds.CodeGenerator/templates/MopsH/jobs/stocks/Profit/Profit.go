package main

import (
	"fmt"
	"os"
	"time"

	"github.com/NedHsu/golang-stock/models"
	"github.com/NedHsu/golang-stock/stocks/profit"
	"github.com/NedHsu/golang-stock/utilities"
	"github.com/xormplus/builder"
	"github.com/xormplus/xorm"

	_ "github.com/denisenkom/go-mssqldb"
)

var (
	date             time.Time
	config           = utilities.InitConfigure()
	connectionString = config.GetString("MSSQL.ConnectionString")
	path             = config.GetString("OutPutPath")
)

func main() {
	utilities.InitLogger(fmt.Sprintf("%s%s_syncProfit.log", path, time.Now().Format("20060102")), "profit", true)
	endDate := time.Now()
	startDate := time.Now()
	if len(os.Args) > 2 {
		startDate, _ = time.Parse("20060102", os.Args[1])
		endDate, _ = time.Parse("20060102", os.Args[2])
	}
	_endDate := endDate.AddDate(0, 0, 1)
	for d := startDate; d.Before(_endDate); d = d.AddDate(0, 1, 0) {
		date = d
		fmt.Println("Fetch Profits", date)
		processProfit("tse")
	}
}

func processProfit(ex string) {
	f := profit.GetProfitInstance(ex)
	f.Init()
	f.Fetch(date)
	f.Wait()
	records := f.GetData()
	count := len(records)
	fmt.Println("Count:", count)
	if count == 0 {
		return
	}
	syncDb(records)
}

func syncDb(records []*models.StockProfit) {
	if len(records) < 1 {
		return
	}
	engine, err := xorm.NewMSSQL("mssql", connectionString)
	utilities.CheckErr(err)
	defer engine.Close()

	session := engine.NewSession()
	defer session.Close()

	max := len(records)
	once := 99
	for i := 0; i < max; i += once {
		last := i + once
		if last > max {
			last = max
		}
		var codes []string
		for _, record := range records[i:last] {
			codes = append(codes, record.StockCode)
		}
		result, err := session.Where("date = ?", records[i].Date).And(builder.In("StockCode", codes)).Delete(&models.StockProfit{})
		fmt.Println(i, result, err)

		result, err = session.Insert(records[i:last])
		fmt.Println(i, result, err)
		if err != nil {
			for ri, record := range records[i:last] {
				_, err = session.Insert(record)
				fmt.Println(i+ri, record.StockCode, err)
			}
		}
	}
	utilities.CheckErr(session.Commit())
}
