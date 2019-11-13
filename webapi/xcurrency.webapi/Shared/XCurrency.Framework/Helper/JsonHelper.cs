using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.Globalization;

namespace XCurrency.Framework.Helper
{
	public static class JsonHelper
	{
		public static T FromJson<T>(string json) => JsonConvert.DeserializeObject<T>(json, Converter.Settings);

		public static string ToJson<T>(this T self) => JsonConvert.SerializeObject(self, Converter.Settings);

		internal static class Converter
		{
			public static readonly JsonSerializerSettings Settings = new JsonSerializerSettings
			{
				MetadataPropertyHandling = MetadataPropertyHandling.Ignore,
				DateParseHandling = DateParseHandling.None,
				Converters =
						{
							new IsoDateTimeConverter { DateTimeStyles = DateTimeStyles.AssumeUniversal }
						},
			};
		}
	}
}
