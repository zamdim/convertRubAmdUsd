import React, { CSSProperties, FC, useEffect, useRef, useState } from 'react';
import styles from './truncateText.module.styl';
import { withTooltip } from '@consta/uikit/withTooltip';
import { Text, TextProps } from '@consta/uikit/Text';
import classNames from 'classnames/bind';
import { IconCopy } from '@consta/uikit/IconCopy';
import useScreenSize from 'src/hooks/useScreenSize';

const cx = classNames.bind(styles);

interface IWithCopyBtn {
  text: string;
}

const WithCopyBtn: FC<IWithCopyBtn> = ({ text }) => {
  const onCopyClick = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex gap-2">
      <Text size="xs">{text}</Text>
      <div>
        <IconCopy size="s" className="cursor-pointer" onClick={onCopyClick} />
      </div>
    </div>
  );
};

const TruncateText: FC<
  TextProps & {
    text: string | undefined;
    className?: string;
    style?: CSSProperties;
    withCopyBtn?: boolean;
    textClassName?: string;
  }
> = (props) => {
  const textRef = useRef<HTMLDivElement>(null);
  const withTooltipRef = useRef<HTMLDivElement>(null);

  const {
    text = '-',
    className,
    textClassName,
    withCopyBtn,
    ...otherProps
  } = props;

  const [truncate, setTruncate] = useState(false);
  const [screenWidth] = useScreenSize();

  const TextWithTooltip = withTooltip({
    content: withCopyBtn ? ((<WithCopyBtn text={text} />) as any) : text,
    appearTimeout: 200,
    style: otherProps.style,
  })(Text);

  useEffect(() => {
    const checkRef = (element: HTMLDivElement | null) => {
      if (element) {
        const isHorizontalOverflow = element.scrollWidth > element.clientWidth;
        const isVerticalOverflow = element.scrollHeight > element.clientHeight;

        if (isVerticalOverflow || isHorizontalOverflow) {
          setTruncate(true);
        } else {
          setTruncate(false);
        }
      }
    };

    checkRef(textRef.current);
    checkRef(withTooltipRef.current);
  }, [screenWidth]);

  const onClickTruncate = (e: MouseEvent) => {
    if (screenWidth <= 1111) {
      const prevPopover = document.getElementsByClassName(
        'Popover',
      )?.[0] as HTMLDivElement;
      const prevPopoverText = prevPopover?.innerText;

      if (prevPopoverText !== text) {
        e.stopPropagation();
      }
    }
  };

  return (
    <div className={cx('root', className)}>
      {!truncate ? (
        <Text
          {...otherProps}
          className={cx('text', textClassName)}
          ref={textRef}
        >
          {text}
        </Text>
      ) : (
        <TextWithTooltip
          {...otherProps}
          truncate
          className={cx('text', textClassName)}
          ref={withTooltipRef}
          onClick={(e: any) => {
            onClickTruncate(e);
          }}
        >
          {text}
        </TextWithTooltip>
      )}
    </div>
  );
};

export default TruncateText;
