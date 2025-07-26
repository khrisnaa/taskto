<?php

namespace App\Enums;

enum TaskStatus: string
{
    case Draft          = 'Draft';
    case OnProgress     = 'On Progress';
    case Completed      = 'Completed';
}
