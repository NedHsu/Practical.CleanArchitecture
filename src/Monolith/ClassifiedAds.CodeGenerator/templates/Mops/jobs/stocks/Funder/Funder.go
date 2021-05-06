package main

import (
	"fmt"
	"os"
	"sort"
	"time"

	"github.com/NedHsu/golang-stock/models"
	"github.com/NedHsu/golang-stock/stocks/funder"
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
	utilities.InitLogger(fmt.Sprintf("%s%s_syncFunder.log", path, time.Now().Format("20060102")), "scheduler", true)
	endDate := time.Now()
	startDate := time.Now()
	if len(os.Args) > 2 {
		startDate, _ = time.Parse("20060102", os.Args[1])
		endDate, _ = time.Parse("20060102", os.Args[2])
	}
	_endDate := endDate.AddDate(0, 0, 1)
	for d := startDate; d.Before(_endDate); d = d.AddDate(0, 0, 1) {
		date = d
		fmt.Println("Fetch Funders", date)
		processFunder("tse")
		processFunder("otc")
	}
}

func processFunder(ex string) {
	f := funder.GetFunderInstance(ex)
	f.Init()
	f.Fetch(date)
	f.Wait()
	records := f.GetData()
	count := len(records)
	utilities.ZapLogger.Info(fmt.Sprintln("Count:", count))
	if count == 0 {
		return
	}
	sort.Slice(records[:], func(i, j int) bool {
		return records[i].Total > records[j].Total
	})
	fmt.Println("Buy Top 10:")
	for index, record := range records[0:10] {
		fmt.Printf("%d. %s(%s) %d\n", index+1, record.StockName, record.StockCode, record.Total)
	}
	println("------------------------------------")
	fmt.Println("Sell Top 10:")
	for i := 1; i <= 10 && count-i >= 0; i++ {
		record := records[count-i]
		fmt.Printf("%d. %s(%s) %d\n", i, record.StockName, record.StockCode, record.Total)
	}
	syncDb(records)
}

func syncDb(records []*models.StockFunder) {
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
		result, err := session.Where("date = ?", records[i].Date).And(builder.In("StockCode", codes)).Delete(&models.StockFunder{})
		utilities.ZapLogger.Info(fmt.Sprintln(i, result, err))

		result, err = session.Insert(records[i:last])
		utilities.ZapLogger.Info(fmt.Sprintln(i, result, err))
	}
	utilities.CheckErr(session.Commit())
}
