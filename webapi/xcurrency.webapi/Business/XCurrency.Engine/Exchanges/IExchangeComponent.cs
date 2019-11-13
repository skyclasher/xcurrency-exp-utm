using XCurrency.Entities.DomainModels;

namespace XCurrency.Engine.Exchanges
{
	public interface IExchangeComponent
	{
		string ExchangeCurrency(Exchange exchange);
	}
}
