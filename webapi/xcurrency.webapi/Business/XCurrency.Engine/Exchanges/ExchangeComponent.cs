using RestSharp;
using System.Linq;
using XCurrency.Entities.DomainModels;
using XCurrency.Framework.Helper;

namespace XCurrency.Engine.Exchanges
{
	public class ExchangeComponent : IExchangeComponent
	{
		public string ExchangeCurrency(Exchange exchange)
		{

			var client = new RestClient("https://api.exchangeratesapi.io");
			var request = new RestRequest($"latest?symbols={exchange.ToCurrency}&base={exchange.FromCurrency}", Method.GET);
			var response = client.Execute(request);

			ExchangeAPI exchangeAPI = JsonHelper.FromJson<ExchangeAPI>(response.Content);

			return (exchange.FromValue * exchangeAPI.Rates.First().Value).ToString();
		}
	}
}
