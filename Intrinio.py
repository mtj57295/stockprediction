import intrinio_sdk
from intrinio_sdk.rest import ApiException

class Intrinio:

    def __init__(self):
        try:
            intrinio_sdk.ApiClient().configuration.api_key['api_key'] = 'OmNiNGM1YmUyZTFhOGVhODgzMWIxZmNmZjdiYTllZWFj'
            self.security_api = intrinio_sdk.SecurityApi()
            self.company_api = intrinio_sdk.CompanyApi()
        except ApiException as e:
          print("Exception when establishing connection with api: %s\r\n" % e)

    def search_security_api(self, id, start_date, end_date, frequency='daily', page_size=100, next_page=''):
        try:
          return self.security_api.get_security_stock_prices(id, start_date=start_date, end_date=end_date,
                    frequency=frequency, page_size=page_size, next_page=next_page)
        except ApiException as e:
          print("Exception when calling SecurityApi->get_security_stock_prices: %s\r\n" % e)

    def search_company_api(self, company, page_size=1):
        try:
          return self.company_api.search_companies(company, page_size=page_size)
        except ApiException as e:
          print("Exception when calling CompanyApi->search_companies: %s\r\n" % e)
