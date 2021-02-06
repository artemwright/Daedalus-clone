// @flow
import { Component } from 'react';
import { computed } from 'mobx';
import BigNumber from 'bignumber.js';
import moment from 'moment';

// Assets and helpers
import {
  generateTransaction,
  generateMultipleTransactions,
  generateHash,
  // generateAsset,
} from '../../_support/utils';
import {
  generateFilterOptions,
  isTransactionInFilterRange,
} from '../../../../source/renderer/app/utils/transaction.js';
import {
  TransactionStates,
  TransactionTypes,
} from '../../../../source/renderer/app/domains/WalletTransaction';

import { emptyTransactionFilterOptions } from '../../../../source/renderer/app/stores/TransactionsStore';
import type { TransactionFilterOptionsType } from '../../../../source/renderer/app/stores/TransactionsStore';
import { WALLET_ASSETS_ENABLED } from '../../../../source/renderer/app/config/walletsConfig';

type Props = {
  getStory: Function,
  locale: string,
  transactionsOption: string,
};

type State = {
  filterOptions: TransactionFilterOptionsType,
};

/* const allAssets = [
  generateAsset(
    '65bc72542b0ca20391caaf66a4d4d7897d281f9c136cd3513136945b',
    '',
    {
      name: 'TrueUSD',
      acronym: 'TUSD',
      description: 'Test description',
      unit: {
        name: 'TUSD',
        decimals: 6,
      },
      url: 'http://example.com',
      logo: '',
    }
  ),
  generateAsset(
    '65ac82542b0ca20391caaf66a4d4d7897d281f9c136cd3513136945b',
    '',
    {
      name: 'Tether',
      acronym: 'USDT',
      description: 'Test description',
      unit: {
        name: 'USDT',
        decimals: 6,
      },
      url: 'http://example.com',
      logo: '',
    }
  ),
  generateAsset(
    '65cn72542b0ca10391caaf66a4d4d2897d281f3c136cd3513136945b',
    '',
    {
      name: 'USD Coin',
      acronym: 'USDC',
      description: 'Test description',
      unit: {
        name: 'USDC',
        decimals: 6,
      },
      url: 'http://example.com',
      logo: '',
    }
  ),
  generateAsset(
    '65bc72542b0ca20391caaf66a4d4e7897d282f9c136cd3513136945c',
    '',
    {
      name: 'MakerDAO',
      acronym: 'DAI',
      description: 'Test description',
      unit: {
        name: 'DAI',
        decimals: 6,
      },
      url: 'http://example.com',
      logo: '',
    }
  ),
]; */

const assets = [
  {
    id: generateHash(),
    policyId: '65bc72542b0ca20391caaf66a4d4d7897d281f9c136cd3513136945b',
    assetName: '',
    quantity: 100,
  },
  {
    id: generateHash(),
    policyId: '65ac82542b0ca20391caaf66a4d4d7897d281f9c136cd3513136945b',
    assetName: '',
    quantity: 200,
  },
  {
    id: generateHash(),
    policyId: '65cn72542b0ca10391caaf66a4d4d2897d281f3c136cd3513136945b',
    assetName: '',
    quantity: 300,
  },
  {
    id: generateHash(),
    policyId: '65bc72542b0ca20391caaf66a4d4e7897d282f9c136cd3513136945c',
    assetName: '',
    quantity: 400,
  },
];

/* const walletAssets = assets.map((assetTotal) => {
  const assetData = allAssets.find(
    (item) => item.policyId === assetTotal.policyId
  );
  return {
    id: assetData ? assetData.id : '',
    metadata: assetData
      ? assetData.metadata
      : {
          name: '',
          acronym: '',
          description: '',
        },
    total: assetTotal || {},
  };
}) */

export default class WalletsTransactionsWrapper extends Component<
  Props,
  State
> {
  state = {
    filterOptions: generateFilterOptions(this.transactions),
  };

  get transactionsOptions() {
    return {
      groupedByDays: [
        generateTransaction(
          TransactionTypes.INCOME,
          new Date(),
          new BigNumber(1)
        ),
        generateTransaction(
          TransactionTypes.EXPEND,
          moment().subtract(1, 'days').toDate(),
          new BigNumber(1)
        ),
        generateTransaction(
          TransactionTypes.INCOME,
          new Date(),
          new BigNumber(1)
        ),
        generateTransaction(
          TransactionTypes.EXPEND,
          moment().subtract(2, 'days').toDate(),
          new BigNumber(1)
        ),
        generateTransaction(
          TransactionTypes.INCOME,
          moment().subtract(1, 'days').toDate(),
          new BigNumber(1)
        ),
      ],
      confirmedAndPendingTransactions: [
        generateTransaction(
          TransactionTypes.INCOME,
          new Date(),
          new BigNumber(1),
          TransactionStates.OK
        ),
        generateTransaction(
          TransactionTypes.EXPEND,
          new Date(),
          new BigNumber(1),
          TransactionStates.PENDING
        ),
        generateTransaction(
          TransactionTypes.INCOME,
          new Date(2019, 10, 8, 20),
          new BigNumber(1),
          TransactionStates.PENDING,
          true
        ),
        generateTransaction(
          TransactionTypes.EXPEND,
          new Date(),
          new BigNumber(13),
          TransactionStates.FAILED
        ),
      ],
      renderingManyTransactions: generateMultipleTransactions(500),
      unresolvedIncomeAddresses: [
        generateTransaction(
          TransactionTypes.EXPEND,
          new Date(),
          new BigNumber(1),
          TransactionStates.OK,
          true
        ),
        generateTransaction(
          TransactionTypes.INCOME,
          new Date(),
          new BigNumber(1),
          TransactionStates.OK,
          true
        ),
      ],
      withoutIncomeAddresses: [
        generateTransaction(
          TransactionTypes.INCOME,
          new Date(),
          new BigNumber(1),
          TransactionStates.OK,
          false,
          true
        ),
        generateTransaction(
          TransactionTypes.INCOME,
          new Date(),
          new BigNumber(1),
          TransactionStates.OK,
          false,
          true
        ),
      ],
      withWithdrawalAddresses: [
        generateTransaction(
          TransactionTypes.INCOME,
          new Date(),
          new BigNumber(1),
          TransactionStates.OK,
          false,
          false,
          false
        ),
        generateTransaction(
          TransactionTypes.INCOME,
          new Date(),
          new BigNumber(1),
          TransactionStates.OK,
          false,
          false,
          false
        ),
      ],
    };
  }

  get transactionsWithAssetsOptions() {
    return {
      groupedByDays: [
        generateTransaction(
          TransactionTypes.INCOME,
          new Date(),
          new BigNumber(2),
          TransactionStates.OK,
          false,
          false,
          true,
          new BigNumber(0.012345),
          {
            input: assets,
            output: null,
          }
        ),
        generateTransaction(
          TransactionTypes.EXPEND,
          moment().subtract(1, 'days').toDate(),
          new BigNumber(2),
          TransactionStates.OK,
          false,
          false,
          true,
          new BigNumber(0.012345),
          {
            input: null,
            output: assets,
          }
        ),
        generateTransaction(
          TransactionTypes.INCOME,
          new Date(),
          new BigNumber(2),
          TransactionStates.OK,
          false,
          false,
          true,
          new BigNumber(0.012345),
          {
            input: assets,
            output: null,
          }
        ),
        generateTransaction(
          TransactionTypes.EXPEND,
          moment().subtract(2, 'days').toDate(),
          new BigNumber(2),
          TransactionStates.OK,
          false,
          false,
          true,
          new BigNumber(0.012345),
          {
            input: null,
            output: assets,
          }
        ),
        generateTransaction(
          TransactionTypes.INCOME,
          moment().subtract(1, 'days').toDate(),
          new BigNumber(2),
          TransactionStates.OK,
          false,
          false,
          true,
          new BigNumber(0.012345),
          {
            input: assets,
            output: null,
          }
        ),
      ],
      confirmedAndPendingTransactions: [
        generateTransaction(
          TransactionTypes.INCOME,
          new Date(),
          new BigNumber(2),
          TransactionStates.OK,
          false,
          false,
          true,
          new BigNumber(0.012345),
          {
            input: assets,
            output: null,
          }
        ),
        generateTransaction(
          TransactionTypes.EXPEND,
          new Date(),
          new BigNumber(2),
          TransactionStates.PENDING,
          false,
          false,
          true,
          new BigNumber(0.012345),
          {
            input: null,
            output: assets,
          }
        ),
        generateTransaction(
          TransactionTypes.INCOME,
          new Date(2019, 10, 8, 20),
          new BigNumber(2),
          TransactionStates.PENDING,
          true,
          false,
          true,
          new BigNumber(0.012345),
          {
            input: assets,
            output: null,
          }
        ),
        generateTransaction(
          TransactionTypes.EXPEND,
          new Date(),
          new BigNumber(13),
          TransactionStates.FAILED,
          false,
          false,
          true,
          new BigNumber(0.012345),
          {
            input: null,
            output: assets,
          }
        ),
      ],
      renderingManyTransactions: generateMultipleTransactions(500),
      unresolvedIncomeAddresses: [
        generateTransaction(
          TransactionTypes.EXPEND,
          new Date(),
          new BigNumber(2),
          TransactionStates.OK,
          true,
          false,
          true,
          new BigNumber(0.012345),
          {
            input: null,
            output: assets,
          }
        ),
        generateTransaction(
          TransactionTypes.INCOME,
          new Date(),
          new BigNumber(2),
          TransactionStates.OK,
          true,
          false,
          true,
          new BigNumber(0.012345),
          {
            input: assets,
            output: null,
          }
        ),
      ],
      withoutIncomeAddresses: [
        generateTransaction(
          TransactionTypes.INCOME,
          new Date(),
          new BigNumber(2),
          TransactionStates.OK,
          false,
          true,
          true,
          new BigNumber(0.012345),
          {
            input: assets,
            output: null,
          }
        ),
        generateTransaction(
          TransactionTypes.INCOME,
          new Date(),
          new BigNumber(2),
          TransactionStates.OK,
          false,
          true,
          true,
          new BigNumber(0.012345),
          {
            input: assets,
            output: null,
          }
        ),
      ],
      withWithdrawalAddresses: [
        generateTransaction(
          TransactionTypes.INCOME,
          new Date(),
          new BigNumber(2),
          TransactionStates.OK,
          false,
          false,
          false,
          new BigNumber(0.012345),
          {
            input: assets,
            output: null,
          }
        ),
        generateTransaction(
          TransactionTypes.INCOME,
          new Date(),
          new BigNumber(2),
          TransactionStates.OK,
          false,
          false,
          false,
          new BigNumber(0.012345),
          {
            input: assets,
            output: null,
          }
        ),
      ],
    };
  }

  get totalAvailable() {
    const { transactionsOption } = this.props;
    return this.transactionsOptions[transactionsOption].length;
  }

  get transactions() {
    const { transactionsOption } = this.props;
    const { filterOptions = emptyTransactionFilterOptions } = this.state || {};
    const hasAssetsEnabled = WALLET_ASSETS_ENABLED;
    const transactionsList = hasAssetsEnabled
      ? this.transactionsWithAssetsOptions[transactionsOption]
      : this.transactionsOptions[transactionsOption];
    return transactionsList.filter((transaction) =>
      isTransactionInFilterRange(filterOptions, transaction)
    );
  }

  @computed get defaultFilterOptions(): TransactionFilterOptionsType {
    return generateFilterOptions(this.transactions);
  }

  @computed get populatedFilterOptions(): TransactionFilterOptionsType {
    return this.state.filterOptions || emptyTransactionFilterOptions;
  }

  onFilter = (filterOptions: TransactionFilterOptionsType) => {
    this.setState({ filterOptions });
  };

  render() {
    const { getStory, locale } = this.props;
    const { filterOptions } = this.state;
    const {
      defaultFilterOptions,
      onFilter,
      populatedFilterOptions,
      transactions,
      totalAvailable,
    } = this;
    const children = getStory({
      defaultFilterOptions,
      filterOptions,
      locale,
      onFilter,
      populatedFilterOptions,
      transactions,
      totalAvailable,
    });
    return children;
  }
}
