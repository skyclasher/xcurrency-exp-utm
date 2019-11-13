namespace XCurrency.Entities.DomainModels
{
	public class Exchange
	{
		public string FromCurrency { get; set; }
		public double FromValue { get; set; }
		public string ToCurrency { get; set; }
		public double ToValue { get; set; }
	}
}
