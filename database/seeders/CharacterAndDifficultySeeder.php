<?php

namespace Database\Seeders;

use App\Models\Character;
use App\Models\Difficulty;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CharacterAndDifficultySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $characters = [
            [
                'name' => 'Froggorz',
                'image_url' => 'assets/monster1r.png',
                'is_boss' => true,
            ],
            [
                'name' => 'Wolvid',
                'image_url' => 'assets/monster2r.png',
                'is_boss' => true,
            ],
            [
                'name' => 'Mushribs',
                'image_url' => 'assets/monster3r.png',
                'is_boss' => true,
            ],
        ];

        $difficulties = [
            ['Easy', 0.5],
            ['Normal', 1],
            ['Hardcore', 2],
        ];

        foreach ($characters as $index => $character) {
            $characterModel = Character::create($character);
            Difficulty::create([
                'name' => $difficulties[$index][0],
                'character_id' => $characterModel->id,
                'multiplier' => $difficulties[$index][1],
            ]);
        }

        $characters = [
            [
                'name' => 'The Sprinter',
                'image_url' => 'assets/char1.png',
                'is_boss' => false,
            ],
            [
                'name' => 'The Flow Seeker',
                'image_url' => 'assets/char2.png',
                'is_boss' => false,
            ],
            [
                'name' => 'The Challenger',
                'image_url' => 'assets/char4.png',
                'is_boss' => false,
            ],
            [
                'name' => 'The Visionary',
                'image_url' => 'assets/char5.png',
                'is_boss' => false,
            ],
        ];

        foreach ($characters as $index => $character) {
            $characterModel = Character::create($character);
        }
    }
}
