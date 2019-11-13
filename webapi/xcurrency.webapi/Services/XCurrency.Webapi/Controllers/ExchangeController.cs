using Microsoft.AspNetCore.Mvc;
using System;
using XCurrency.Engine.Exchanges;
using XCurrency.Entities.DomainModels;

namespace XCurrency.Webapi.Controllers
{
	[Route("api/exchange")]
	[ApiController]
	public class ExchangeController : ControllerBase
	{
		IExchangeComponent _exchangeComponent;

		public ExchangeController(IExchangeComponent exchangeComponent)
		{
			_exchangeComponent = exchangeComponent;
		}

		// POST api/exchange
		[HttpPost()]
		public IActionResult Post([FromBody] Exchange exchange)
		{
			try
			{
				string result = _exchangeComponent.ExchangeCurrency(exchange);
				return Ok(result);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}
	}
}