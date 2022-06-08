using ClassifiedAds.Domain.Infrastructure.Payment;
using ECPay.Payment.Integration;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace ClassifiedAds.Infrastructure.Payment.ECPay
{
    public class ECPayManager : IPaymentManager
    {
        private readonly ECPayOptions _options;

        public ECPayManager(ECPayOptions options)
        {
            _options = options;
        }

        public CheckOutResult CheckOut(CheckOutParameters paras)
        {
            var result = new CheckOutResult()
            {
                Errors = new List<string>(),
            };
            AllInOneHandle(result, oPayment =>
            {
                /* 基本參數 */
                oPayment.Send.ReturnURL = _options.ReturnURL;
                oPayment.Send.ClientBackURL = _options.ClientBackURL;
                oPayment.Send.OrderResultURL = string.Empty;
                oPayment.Send.MerchantTradeNo = paras.MerchantTradeNo;
                oPayment.Send.MerchantTradeDate = paras.MerchantTradeDate.ToString("yyyy/MM/dd HH:mm:ss");
                oPayment.Send.TotalAmount = paras.TotalAmount;
                oPayment.Send.TradeDesc = paras.TradeDesc;
                oPayment.Send.ChoosePayment = PaymentMethod.ALL;
                oPayment.Send.Remark = string.Empty;
                oPayment.Send.ChooseSubPayment = PaymentMethodItem.None;
                oPayment.Send.NeedExtraPaidInfo = ExtraPaymentInfo.No;
                oPayment.Send.DeviceSource = DeviceType.PC;
                oPayment.Send.IgnorePayment = string.Empty;
                oPayment.Send.PlatformID = paras.PlatformID;
                oPayment.Send.HoldTradeAMT = HoldTradeType.Yes;
                oPayment.Send.CustomField1 = string.Empty;
                oPayment.Send.CustomField2 = string.Empty;
                oPayment.Send.CustomField3 = string.Empty;
                oPayment.Send.CustomField4 = string.Empty;
                oPayment.Send.EncryptType = 1;

                // 訂單的商品資料
                oPayment.Send.Items.AddRange(paras.Items.Select(x => new Item
                {
                    Name = x.Name,
                    Price = x.Price,
                    Currency = "新台幣",
                    Quantity = x.Quantity,
                    URL = x.URL,
                }));
                /*************************非即時性付款:ATM、CVS 額外功能參數**************/

                #region ATM 額外功能參數

                // oPayment.SendExtend.ExpireDate = 3;//允許繳費的有效天數
                // oPayment.SendExtend.PaymentInfoURL = "";//伺服器端回傳付款相關資訊
                // oPayment.SendExtend.ClientRedirectURL = "";//Client 端回傳付款相關資訊
                #endregion

                #region CVS 額外功能參數

                // oPayment.SendExtend.StoreExpireDate = 3; //超商繳費截止時間 CVS:以分鐘為單位 BARCODE:以天為單位
                // oPayment.SendExtend.Desc_1 = "test1";//交易描述 1
                // oPayment.SendExtend.Desc_2 = "test2";//交易描述 2
                // oPayment.SendExtend.Desc_3 = "test3";//交易描述 3
                // oPayment.SendExtend.Desc_4 = "";//交易描述 4
                // oPayment.SendExtend.PaymentInfoURL = "";//伺服器端回傳付款相關資訊
                // oPayment.SendExtend.ClientRedirectURL = "";///Client 端回傳付款相關資訊
                #endregion

                /***************************信用卡額外功能參數***************************/

                #region Credit 功能參數

                // oPayment.SendExtend.BindingCard = BindingCardType.No; //記憶卡號
                // oPayment.SendExtend.MerchantMemberID = ""; //記憶卡號識別碼
                // oPayment.SendExtend.Language = "ENG"; //語系設定
                #endregion Credit 功能參數

                #region 一次付清

                // oPayment.SendExtend.Redeem = false;   //是否使用紅利折抵
                // oPayment.SendExtend.UnionPay = true; //是否為銀聯卡交易
                #endregion

                #region 分期付款

                // oPayment.SendExtend.CreditInstallment = 3;//刷卡分期期數
                #endregion 分期付款

                #region 定期定額

                // oPayment.SendExtend.PeriodAmount = 1000;//每次授權金額
                // oPayment.SendExtend.PeriodType = PeriodType.Day;//週期種類
                // oPayment.SendExtend.Frequency = 1;//執行頻率
                // oPayment.SendExtend.ExecTimes = 2;//執行次數
                // oPayment.SendExtend.PeriodReturnURL = "";//伺服器端回傳定期定額的執行結果網址。
                #endregion

                /* 產生訂單 */
                var oResult = oPayment.CheckOut();
                result.Errors.AddRange(oResult.ErrorList);
                result.Data = oResult.htParameters;
            });
            return result;
        }

        public PayActionResult Action(PaymentActionParameters paras)
        {
            var result = new PayActionResult();
            AllInOneHandle(result, oPayment =>
            {
                /* 基本參數 */
                oPayment.Action.MerchantTradeNo = paras.MerchantTradeNo;
                oPayment.Action.TradeNo = paras.TradeNo;
                oPayment.Action.Action = ActionType.C;
                oPayment.Action.TotalAmount = paras.TotalAmount;
                oPayment.Action.Action = paras.Action switch
                {
                    PaymentAction.Cancel => ActionType.E,
                    PaymentAction.Close => ActionType.C,
                    PaymentAction.Refund => ActionType.R,
                    PaymentAction.Abandon => ActionType.N,
                    _ => throw new NotImplementedException(),
                };

                var oResult = new Hashtable();
                var errors = oPayment.DoAction(ref oResult);
                result.Errors.AddRange(errors);
                result.Data = oResult;
            });
            return result;
        }

        public PayActionResult QueryTradeInfo(QueryTradeInfoParameters paras)
        {
            var result = new PayActionResult();
            AllInOneHandle(result, oPayment =>
            {
                /* 基本參數 */
                oPayment.Query.MerchantTradeNo = paras.MerchantTradeNo; // 廠商的交易編號

                var oResult = new Hashtable();
                var errors = oPayment.DoAction(ref oResult);
                result.Errors.AddRange(errors);
                result.Data = oResult;
            });
            return result;
        }

        private void AllInOneHandle(IResult result, Action<AllInOne> Action)
        {
            try
            {
                using (var oPayment = new AllInOne())
                {
                    /* 服務參數 */
                    oPayment.ServiceMethod = HttpMethod.HttpPOST;
                    oPayment.ServiceURL = _options.ServiceURL;
                    oPayment.HashKey = _options.HashKey;
                    oPayment.HashIV = _options.HashIV;
                    oPayment.MerchantID = _options.MerchantID;
                    Action(oPayment);
                }
            }
            catch (Exception ex)
            {
                // 例外錯誤處理。
                result.Errors.Add(ex.Message);
            }
            finally
            {
                // 顯示錯誤訊息。
                if (result.Errors.Count() > 0)
                {
                    // string szErrorMessage = String.Join("\\r\\n", enErrors);
                }
            }
        }
    }
}
