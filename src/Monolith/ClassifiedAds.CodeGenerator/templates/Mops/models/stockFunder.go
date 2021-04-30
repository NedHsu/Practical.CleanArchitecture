package models

import (
	"time"

	"github.com/NedHsu/golang-stock/utilities/converter"
)

type StockFunder struct {
	StockCode       string    `xorm:"StockCode not null pk VARCHAR(15)"` // 證券代號
	Date            time.Time `xorm:"[Date] not null pk DATE(3)"`
	StockName       string    `xorm:"-"`                               // 證券名稱
	ForeignBuy      int32     `xorm:"ForeignBuy not null INT(4)"`      // 外陸資買進股數(不含外資自營商)
	ForeignSell     int32     `xorm:"ForeignSell not null INT(4)"`     // 外陸資賣出股數(不含外資自營商)
	ForeignSum      int32     `xorm:"ForeignSum not null INT(4)"`      // 外陸資買賣超股數(不含外資自營商)
	ForeignSelfBuy  int32     `xorm:"ForeignSelfBuy not null INT(4)"`  // 外資自營商買進股數
	ForeignSelfSell int32     `xorm:"ForeignSelfSell not null INT(4)"` // 外資自營商賣出股數
	ForeignSelfSum  int32     `xorm:"ForeignSelfSum not null INT(4)"`  // 外資自營商買賣超股數
	CreditBuy       int32     `xorm:"CreditBuy not null INT(4)"`       // 投信買進股數
	CreditSell      int32     `xorm:"CreditSell not null INT(4)"`      // 投信賣出股數
	CreditSum       int32     `xorm:"CreditSum not null INT(4)"`       // 投信買賣超股數
	SelfBuySell     int32     `xorm:"SelfBuySell not null INT(4)"`     // 自營商買賣超股數
	SelfBuy         int32     `xorm:"SelfBuy not null INT(4)"`         // 自營商買進股數(自行買賣)
	SelfSell        int32     `xorm:"SelfSell not null INT(4)"`        // 自營商賣出股數(自行買賣)
	SelfSum         int32     `xorm:"SelfSum not null INT(4)"`         // 自營商買賣超股數(自行買賣)
	SelfHedgingBuy  int32     `xorm:"SelfHedgingBuy not null INT(4)"`  // 自營商買進股數(避險)
	SelfHedgingSell int32     `xorm:"SelfHedgingSell not null INT(4)"` // 自營商賣出股數(避險)
	SelfHedgingSum  int32     `xorm:"SelfHedgingSum not null INT(4)"`  // 自營商買賣超股數(避險)
	Total           int32     `xorm:"Total not null INT(4)"`           // 三大法人買賣超股數
}

func (StockFunder) TableName() string {
	return "StockFunder"
}

func (stock *StockFunder) SetByFields(fields, values []string) {
	converter.SetByFields(stock, fields, values)
}
