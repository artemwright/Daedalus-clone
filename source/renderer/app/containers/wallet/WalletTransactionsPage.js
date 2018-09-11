// @flow
import React, { Component } from 'react';
import { get } from 'lodash';
import { observer, inject } from 'mobx-react';
import { defineMessages, intlShape } from 'react-intl';
import WalletTransactionsList from '../../components/wallet/transactions/WalletTransactionsList';
// import WalletTransactionsSearch from '../../components/wallet/summary/WalletTransactionsSearch';
import WalletNoTransactions from '../../components/wallet/transactions/WalletNoTransactions';
import VerticalFlexContainer from '../../components/layout/VerticalFlexContainer';
import type { InjectedProps } from '../../types/injectedPropsType';
import { formattedWalletAmount } from '../../utils/formatters';
import { WalletSyncStateTags } from '../../domains/Wallet';

export const messages = defineMessages({
  noTransactions: {
    id: 'wallet.transactions.no.transactions',
    defaultMessage: '!!!No transactions',
    description: 'Message shown when wallet has no transactions yet.'
  },
  noTransactionsFound: {
    id: 'wallet.transactions.no.transactions.found',
    defaultMessage: '!!!No transactions found',
    description: 'Message shown when wallet transaction search returns zero results.'
  }
});

type Props = InjectedProps;

@inject('stores', 'actions') @observer
export default class WalletTransactionsPage extends Component<Props> {

  static defaultProps = { actions: null, stores: null };

  static contextTypes = {
    intl: intlShape.isRequired,
  };

  // _handleSearchInputChange = (value: string, event: Object) => {
  //   this.props.actions.ada.transactions.filterTransactions({ searchTerm: event.target.value });
  // };

  render() {
    const { intl } = this.context;
    const actions = this.props.actions;
    const { ada, app } = this.props.stores;
    const { wallets, transactions } = ada;
    const { openExternalLink } = app;
    const activeWallet = wallets.active;
    const {
      searchOptions,
      searchRequest,
      hasAny,
      totalAvailable,
      filtered,
    } = transactions;

    // Guard against potential null values
    if (!searchOptions || !activeWallet) return null;

    const { searchLimit, searchTerm } = searchOptions;
    const wasSearched = searchTerm !== '';
    let walletTransactions = null;
    // let transactionSearch = null;
    const noTransactionsLabel = intl.formatMessage(messages.noTransactions);
    const noTransactionsFoundLabel = intl.formatMessage(messages.noTransactionsFound);

    const isRestoreActive = get(activeWallet, 'syncState.tag') === WalletSyncStateTags.RESTORING;

    // if (wasSearched || hasAny) {
    //   transactionSearch = (
    //     <div style={{ flexShrink: 0 }}>
    //       <WalletTransactionsSearch
    //         searchTerm={searchTerm}
    //         onChange={this._handleSearchInputChange}
    //       />
    //     </div>
    //   );
    // }

    if (searchRequest.isExecutingFirstTime || hasAny || isRestoreActive) {
      walletTransactions = (
        <WalletTransactionsList
          transactions={filtered}
          isLoadingTransactions={searchRequest.isExecutingFirstTime}
          isRestoreActive={isRestoreActive}
          hasMoreToLoad={totalAvailable > searchLimit}
          onLoadMore={actions.ada.transactions.loadMoreTransactions.trigger}
          assuranceMode={activeWallet.assuranceMode}
          walletId={activeWallet.id}
          formattedWalletAmount={formattedWalletAmount}
          onOpenExternalLink={openExternalLink}
        />
      );
    } else if (wasSearched && !hasAny) {
      walletTransactions = <WalletNoTransactions label={noTransactionsFoundLabel} />;
    } else if (!hasAny) {
      walletTransactions = <WalletNoTransactions label={noTransactionsLabel} />;
    }

    return (
      <VerticalFlexContainer>
        {/* transactionSearch */}
        {walletTransactions}
      </VerticalFlexContainer>
    );
  }

}
