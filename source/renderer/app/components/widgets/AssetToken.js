// @flow
import React, { Component } from 'react';
import { PopOver } from 'react-polymorph/lib/components/PopOver';
import { observer } from 'mobx-react';
import classnames from 'classnames';
import styles from './AssetToken.scss';
import { ellipsis } from '../../utils/strings';
import type { WalletSummaryAsset } from '../../api/assets/types';

type Props = {
  asset: WalletSummaryAsset,
  // In case it's not possible to calculate the container width
  // this props defines after how many characters the text will cut off
  policyIdEllipsisLeft?: number,
  hideTooltip?: boolean,
};

@observer
export default class AssetToken extends Component<Props> {
  contentRender() {
    const { asset, policyIdEllipsisLeft } = this.props;
    const { fingerprint, policyId } = asset;
    const componentClasses = classnames([styles.component]);
    return (
      <div className={componentClasses}>
        <div className={styles.fingerprint}>
          {ellipsis(fingerprint || '', 9, 4)}
        </div>
        <div className={styles.policyId}>
          {policyIdEllipsisLeft
            ? ellipsis(policyId, policyIdEllipsisLeft)
            : policyId}
        </div>
      </div>
    );
  }

  tooltipRender() {
    const { asset } = this.props;
    const { fingerprint, policyId, assetName, metadata } = asset;
    const { name, acronym, description } = metadata || {};
    return (
      <div className={styles.tooltipContent}>
        <div className={styles.fingerprint}>{fingerprint}</div>
        <dl>
          <dt>Policy Id</dt>
          <dd>
            <em>{policyId}</em>
          </dd>
          {assetName && (
            <>
              <dt>Asset name</dt>
              <dd>{assetName}</dd>
            </>
          )}
          {name && (
            <>
              <dt>Name</dt>
              <dd>{name}</dd>
            </>
          )}
          {acronym && (
            <>
              <dt>Acronym</dt>
              <dd>{acronym}</dd>
            </>
          )}
          {description && (
            <>
              <dt>Description</dt>
              <dd>{description}</dd>
            </>
          )}
        </dl>
      </div>
    );
  }

  render() {
    const { hideTooltip } = this.props;
    const children = this.contentRender();
    const tooltipContent = this.tooltipRender();
    if (hideTooltip) return children;
    return (
      <PopOver
        themeVariables={{
          '--rp-pop-over-bg-color':
            'var(--theme-bordered-box-background-color)',
          '--rp-pop-over-text-color': 'var(--theme-bordered-box-text-color)',
        }}
        contentClassName={styles.popOver}
        content={tooltipContent}
      >
        {children}
      </PopOver>
    );
  }
}

// @TOKEN TODO: Remove it

// export type PopOverProps = {
//   allowHTML?: boolean,
//   children?: ReactElement<any>,
//   contentClassName?: string,
//   content: ReactNode,
//   context?: ThemeContextProp,
//   isShowingOnHover?: boolean,
//   isVisible?: boolean,
//   popperOptions: PopperOptions,
//   skin?: ComponentType<any>,
//   theme?: ?Object,
//   themeId?: string,
//   themeOverrides?: { [index: string]: string },
//   themeVariables?: { [index: string]: string },
// };

// const popperOptions = {
//   placement?: Placement;
//   positionFixed?: boolean;
//   eventsEnabled?: boolean;
//   modifiers?: Modifiers;
//   removeOnDestroy?: boolean;
//   onCreate?(data: Data): void;
//   onUpdate?(data: Data): void;
// };

// export type Placement = 'auto-start'
//   | 'auto'
//   | 'auto-end'
//   | 'top-start'
//   | 'top'
//   | 'top-end'
//   | 'right-start'
//   | 'right'
//   | 'right-end'
//   | 'bottom-end'
//   | 'bottom'
//   | 'bottom-start'
//   | 'left-end'
//   | 'left'
//   | 'left-start';

// export interface Modifiers {
//     shift?: BaseModifier;
//     offset?: BaseModifier & {
//       offset?: number | string,
//     };
//     preventOverflow?: BaseModifier & {
//       priority?: Position[],
//       padding?: number | Padding,
//       boundariesElement?: Boundary | Element,
//       escapeWithReference?: boolean
//     };
//     keepTogether?: BaseModifier;
//     arrow?: BaseModifier & {
//       element?: string | Element,
//     };
//     flip?: BaseModifier & {
//       behavior?: Behavior | Position[],
//       padding?: number | Padding,
//       boundariesElement?: Boundary | Element,
//       flipVariations?: boolean,
//       flipVariationsByContent?: boolean,
//     };
//     inner?: BaseModifier;
//     hide?: BaseModifier;
//     applyStyle?: BaseModifier & {
//       onLoad?: Function,
//       gpuAcceleration?: boolean,
//     };
//     computeStyle?: BaseModifier & {
//       gpuAcceleration?: boolean;
//       x?: 'bottom' | 'top',
//       y?: 'left' | 'right'
//     };
//
//     [name: string]: (BaseModifier & Record<string, any>) | undefined;
//   }