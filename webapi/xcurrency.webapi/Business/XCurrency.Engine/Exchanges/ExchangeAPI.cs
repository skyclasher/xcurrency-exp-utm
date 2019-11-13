using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace XCurrency.Engine.Exchanges
{
	public class ExchangeAPI
	{
		[JsonProperty("rates")]
		public Dictionary<string, double> Rates { get; set; }

		[JsonProperty("base")]
		public string Base { get; set; }

		[JsonProperty("date")]
		public DateTimeOffset Date { get; set; }
	}
}
