<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDeals extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('deals', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string('name', 150)->nullable();

            $table->foreignId('deal_types_id')->constrained()
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreignId('deal_statuses_id')->constrained()
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreignId('manager_id')->constrained('users')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreignId('adviser_id')->constrained('users')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreignId('delivery_ways_id')->constrained()
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreignId('delivery_types_id')->constrained()
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreignId('pickup_types_id')->constrained()
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreignId('pay_types_id')->constrained()
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreignId('client_id')->constrained('users')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->boolean('inspector')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('deals');
    }
}
