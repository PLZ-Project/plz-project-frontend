import compat from './compat.mjs';

import { fixupConfigRules } from '@eslint/compat';

const styleGuideArg = fixupConfigRules(compat.extends('airbnb', 'plugin:tailwindcss/recommended'));

export default styleGuideArg;
