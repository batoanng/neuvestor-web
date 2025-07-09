import { Loader } from '@batoanng/mui-components';
import { FC } from 'react';
import { useBoolean, useTimeoutFn } from 'react-use';

export interface ProcessingProps {
  label?: string;
  fullPage?: boolean;

  /** Disables showing the component loader until it has been rendered for this delay period */
  delayMillis?: number;
}

export const Processing: FC<ProcessingProps> = ({
  fullPage = true,
  label = 'Loading',
  delayMillis = 0,
}: ProcessingProps) => {
  const [hidden, toggleHidden] = useBoolean(delayMillis != null && delayMillis > 0);
  useTimeoutFn(() => toggleHidden(false), delayMillis ?? 0);

  return !hidden ? <Loader fullPage={fullPage} label={label} /> : null;
};
