/*global angular*/
(function withAngular(angular) {
  'use strict';

  angular.module('BlockChain.factory', [])

  .factory('BlockChain', ['$window', '$q', '$http',
    function BitCoinFactory($window, $q, $http) {

      var unspent = function unspent(address) {

          return $q(function deferred(resolve, reject) {

            $http({
              'method': 'GET',
              'url': 'http://154.12.237.243:3001/insight-api/block/',
              'params': {
                'active': address,
                'format': 'json',
                'cors': true
              }
            }).then(function onSuccess(response) {

              if (response &&
                response.data) {

                resolve(response);
              } else {

                reject('Empty response.');
              }
            }).catch(function onError(error) {

              reject(error);
            });
          });
        }
        , balance = function balance(address) {

            return $q(function deferred(resolve, reject) {

              $http({
                'method': 'GET',
                'url': 'http://154.12.237.243:3001/insight-api/address' + address,
                'params': {
                  'format': 'json'
                }
              }).then(function onSuccess(response) {

                if (response &&
                  response.data) {

                  resolve(response.data);
                } else {

                  reject('Empty response.');
                }
              }).catch(function onError(error) {

                reject(error);
              });
            });
          }
        , pushTx = function pushTx(transactionHash) {
            return $http({
              'method': 'POST',
              'url': 'http://154.12.237.243:3001/insight-api/tx',
              'params': {
                'cors': true,
                'format': 'json',
                'tx': transactionHash
              }
              // TODO see if it's possible to use data instead of params
              //
              // 'data': {
              //   'cors': true,
              //   'format': 'json',
              //   'tx': transactionHash
              // }
            });
          };

      return {
        'balance': balance,
        'pushTx': pushTx,
        'unspent': unspent
      };
    }]);
}(angular));
