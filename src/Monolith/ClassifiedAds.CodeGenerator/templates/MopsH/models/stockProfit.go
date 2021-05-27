package models

import (
	"time"

	"github.com/NedHsu/golang-stock/utilities/converter"
)

type StockProfit struct {
	StockCode        string    `xorm:"StockCode not null pk VARCHAR(15)"` // 證券代號
	Date             time.Time `xorm:"[Date] not null pk DATE(3)"`
	StockName        string    `xorm:"-"`                                // 公司名稱
	Revenue          float32   `xorm:"Revenue not null INT(4)"`          // 營業收入(百萬元)
	Gross            float32   `xorm:"Gross not null INT(4)"`            // 毛利率(%) (營業毛利)/(營業收入)
	OperatingProfit  float32   `xorm:"OperatingProfit not null INT(4)"`  // 營業利益率(%) (營業利益)/(營業收入)
	UntaxedNetProfit float32   `xorm:"UntaxedNetProfit not null INT(4)"` // 稅前純益率(%) (稅前純益)/(營業收入)
	NetProfit        float32   `xorm:"NetProfit not null INT(4)"`        // 稅後純益率(%) (稅後純益)/(營業收入)
}

func (StockProfit) TableName() string {
	return "StockProfit"
}

func (stock *StockProfit) SetByFields(fields, values []string) {
	converter.SetByFields(stock, fields, values)
}
