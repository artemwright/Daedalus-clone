// @flow
import React, { Component, Fragment } from 'react';
import { observer } from 'mobx-react';
import { defineMessages, intlShape } from 'react-intl';
import { Button } from 'react-polymorph/lib/components/Button';
import classnames from 'classnames';
import { ButtonSkin } from 'react-polymorph/lib/skins/simple/ButtonSkin';
import styles from './StakePoolTooltip.scss';
import { getHSLColor } from '../../../utils/colors';
import type { StakePoolProps } from '../../../api/staking/types';

const messages = defineMessages({
  ranking: {
    id: 'staking.stakePools.tooltip.ranking',
    defaultMessage: '!!!Rank',
    description: '"" for the Stake Pools Tooltip page.',
  },
  controlledStake: {
    id: 'staking.stakePools.tooltip.controlledStake',
    defaultMessage: '!!!Controlled stake',
    description: '"Controlled stake" for the Stake Pools Tooltip page.',
  },
  profitMargin: {
    id: 'staking.stakePools.tooltip.profitMargin',
    defaultMessage: '!!!Profit margin',
    description: '"Profit margin" for the Stake Pools Tooltip page.',
  },
  performance: {
    id: 'staking.stakePools.tooltip.performance',
    defaultMessage: '!!!Performance',
    description: '"Performance" for the Stake Pools Tooltip page.',
  },
  retirement: {
    id: 'staking.stakePools.tooltip.retirement',
    defaultMessage: '!!!Retirement',
    description: '"Retirement" for the Stake Pools Tooltip page.',
  },
  delegateButton: {
    id: 'staking.stakePools.tooltip.delegateButton',
    defaultMessage: '!!!Delegate to this pool',
    description:
      '"Delegate to this pool" Button for the Stake Pools Tooltip page.',
  },
});

type Props = {
  ...$Exact<StakePoolProps>,
  ranking: number,
  onOpenExternalLink: Function,
  className: string,
};

@observer
export default class StakePool extends Component<Props> {
  static contextTypes = {
    intl: intlShape.isRequired,
  };

  get color() {
    return getHSLColor(this.props.ranking);
  }

  render() {
    const { intl } = this.context;
    const {
      id,
      name,
      description,
      url,
      ranking,
      controlledStake,
      profitMargin,
      performance,
      retirement,
      onOpenExternalLink,
      className,
    } = this.props;

    const componentClassnames = classnames([styles.component, className]);

    return (
      <div className={componentClassnames}>
        <h3 className={styles.name}>{name}</h3>
        <div className={styles.id}>{id}</div>
        <div className={styles.description}>{description}</div>
        <div className={styles.url}>{url}</div>
        <dl className={styles.table}>
          <dt>{intl.formatMessage(messages.ranking)}:</dt>
          <dd className={styles.ranking}>
            <span>{ranking}</span>
          </dd>
          <dt>{intl.formatMessage(messages.controlledStake)}:</dt>
          <dd className={styles.controlledStake}>
            <span>{controlledStake}</span>
          </dd>
          <dt>{intl.formatMessage(messages.profitMargin)}:</dt>
          <dd className={styles.profitMargin}>
            <span>{profitMargin}</span>
          </dd>
          <dt>{intl.formatMessage(messages.performance)}:</dt>
          <dd className={styles.performance}>
            <span>{performance}</span>
          </dd>
          {retirement && (
            <Fragment>
              <dt>{intl.formatMessage(messages.retirement)}:</dt>
              <dd className={styles.retirement}>
                <span>{retirement}</span>
              </dd>
            </Fragment>
          )}
        </dl>
        <Button
          className={styles.delegateButton}
          label={intl.formatMessage(messages.delegateButton)}
          onClick={() => onOpenExternalLink(url)}
          skin={ButtonSkin}
        />
      </div>
    );
  }
}
