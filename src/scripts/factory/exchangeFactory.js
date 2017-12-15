exchangeFactory.$inject = ['$http', '$q'];
function exchangeFactory ($http, $q) {
    var apikey = "tfplf9jpvdsm0po7hvf8k03ncm9jjfzf";
    return {
        getCurrencies: getCurrencies,
        calculateCurrency: calculateCurrency
      };
  
      function calculateCurrency(pair, amount){
        let url = decodeURI('https://brka.space/api/sell/' + pair + '/' + amount + '/tfplf9jpvdsm0po7hvf8k03ncm9jjfzf');
        return $http({
          method: 'GET',
          url: url
        });
      }
  
      function getCurrencies(){
        return {
          sell: {
            selected: {
              'shortName': 'BTC', 
              'name': 'Bitcoin',
            }
          },
          get: {
            selected: {
              'shortName': 'USD', 
              'name': 'US Dollar',
            }
          },
          all: [
            {'shortName': 'BTC', 'name': 'Bitcoin', 'imageClass': 'BTC'},
            {'shortName': 'XRP', 'name': 'XRP', 'imageClass': 'XRP'},
            {'shortName': 'LTC', 'name': 'Litcoin', 'imageClass': 'LTC'},
            {'shortName': 'ETH', 'name': 'Ethereum', 'imageClass': 'ETH'},
            {'shortName': 'USD', 'name': 'US Dollar', 'imageClass': 'USDT'}         
          ]
        };
      }
};

export default exchangeFactory;
  