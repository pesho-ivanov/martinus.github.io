#!/usr/bin/ruby
require 'pstore'
begin
	require 'fox'
	include Fox
rescue LoadError
	# no fox 1.0? try 1.6
	require 'rubygems'
	gem 'fxruby', '>= 1.1.0'
	require 'fox16'
	require 'fox16/colors'
	FOXVERSION="1.6"
	include Fox
end


TITLE = "Dice-RPG  - Dice Thrower 2007 Pro Deluxe"

class RandomWindow < FXMainWindow
	def initialize(app)
		store = configStore
		w, h, x, y = nil
		store.transaction do
			w = store['w'] || 350
			h = store['h'] || 300
			x = store['x'] || 100
			y = store['y'] || 100
		end
		super(app, TITLE, nil, nil, DECOR_ALL, x, y, w, h)
		buildGui
	end
	
	def buildGui
		# main frame
		@mainFrame = FXVerticalFrame.new(self, FRAME_NONE|LAYOUT_FILL_X|LAYOUT_FILL_Y)
		controlFrame = FXHorizontalFrame.new(@mainFrame, FRAME_NONE|LAYOUT_FILL_X, 0,0,0,0, 0,0,0,0,0,0)
		
		# matrix
		@matrix = FXMatrix.new(controlFrame, 3, MATRIX_BY_COLUMNS|LAYOUT_FILL_X, 0,0,0,0, 0,0,0,0,0,0)
		
		# range
		FXLabel.new(@matrix, "Dice")
		@rangeSlider = FXSlider.new(@matrix, nil, 0, LAYOUT_CENTER_Y|LAYOUT_FILL_X|LAYOUT_FILL_COLUMN)
		@rangeSlider.range = 2..100
		@rangeSlider.value = 12
		@rangeLabel = FXLabel.new(@matrix, "D#{@rangeSlider.value}", nil)
		
		# Count
		FXLabel.new(@matrix, "Throw")
		@countSlider = FXSlider.new(@matrix, nil, 0, LAYOUT_CENTER_Y|LAYOUT_FILL_X|LAYOUT_FILL_COLUMN)
		@countSlider.range = 1..20
		@countSlider.value = 5
		@countLabel = FXLabel.new(@matrix, @countSlider.value.to_s, nil, LAYOUT_RIGHT)
		
		# Go-Button
		@goBtn = FXButton.new(controlFrame, " &Go ", nil, nil, 0, BUTTON_NORMAL|LAYOUT_FILL_Y)
		@goBtn.addHotKey(?g)
		@goBtn.backColor = FXColor::LightGreen
		
		# range buttone
		buildRangeButtons(@mainFrame, [6, 8, 10, 12, 20, 100])

		# numbers
		@numbers = FXText.new(@mainFrame, nil, 0, TEXT_READONLY|TEXT_WORDWRAP|LAYOUT_FILL_X|LAYOUT_FILL_Y|FRAME_SUNKEN|LAYOUT_SIDE_TOP)
		#@numbers = FXLabel.new(@mainFrame, "", nil, TEXT_READONLY|TEXT_WORDWRAP|LAYOUT_FILL_X|LAYOUT_FILL_Y|FRAME_SUNKEN|LAYOUT_SIDE_TOP)
			
		@numbers.setFont(FXFont.new(self.getApp(), "Arial", 20))

		# formulas 
		info = FXHorizontalFrame.new(@mainFrame, FRAME_NONE|LAYOUT_FILL_X, 0,0,0,0, 0,0,0,0,0,0)
		matrix = FXMatrix.new(info, 2, MATRIX_BY_COLUMNS|LAYOUT_FILL_X, 0,0,0,0, 0,0,0,0,0,0)
		FXLabel.new(matrix, "Condition variables: ").textColor = FXColor::DarkBlue
		FXLabel.new(matrix, "x, max, always, never")
		FXLabel.new(matrix, "Formula variables: ").textColor = FXColor::DarkBlue
		FXLabel.new(matrix, "worst, best, sum, count, max")
		FXLabel.new(matrix, "Operations: ").textColor = FXColor::DarkBlue
		FXLabel.new(matrix, ">, <, >=, <=, ==, +, -, *, /, ...")
		
		btnFrame = FXVerticalFrame.new(info, FRAME_NONE|LAYOUT_FILL_X|LAYOUT_FILL_Y, 0,0,0,0, 0,0,0,0,0,0)
		@helpBtn = FXButton.new(btnFrame, "&Help", nil, nil, 0, BUTTON_NORMAL|LAYOUT_FILL_X|LAYOUT_FILL_Y)
		@aboutBtn = FXButton.new(btnFrame, "&About", nil, nil, 0, BUTTON_NORMAL|LAYOUT_FILL_X|LAYOUT_FILL_Y)
		
		@helpBtn.connect(SEL_COMMAND) do |sender, sel, data|
			FXMessageBox.information(self, MBOX_OK, "Stay calm, Help is on it's way!", HELP)
		end
		
		@aboutBtn.connect(SEL_COMMAND) do |sender, sel, data|
			dialog = FXAboutDialog.new(self)
			dialog.execute
			dialog.stop
		end
 
		@conditions = Array.new
		@formulas = Array.new
		@results = Array.new
		
		formulaFrame = FXMatrix.new(@mainFrame, 6, MATRIX_BY_COLUMNS|LAYOUT_FILL_X, 0,0,0,0, 0,0,0,0,0,0)
		
		3.times do 
			#formulaFrame = FXHorizontalFrame.new(@mainFrame, FRAME_NONE|LAYOUT_FILL_X, 0,0,0,0, 0,0,0,0,0,0)
			FXLabel.new(formulaFrame, "Take if ", nil, LAYOUT_CENTER_Y)
			@conditions.push FXTextField.new(formulaFrame, 1, nil, 0, TEXTFIELD_NORMAL|LAYOUT_FILL_COLUMN|LAYOUT_FILL_X)
			FXLabel.new(formulaFrame, " to calculate ", nil, LAYOUT_CENTER_Y)
			@formulas.push FXTextField.new(formulaFrame, 1, nil, 0, TEXTFIELD_NORMAL|LAYOUT_FILL_X|LAYOUT_FILL_COLUMN)
			FXLabel.new(formulaFrame, "=")
			@results.push FXLabel.new(formulaFrame, "???", nil, LAYOUT_RIGHT)
			@results.last.textColor = FXColor::DarkBlue
		end
		
		@conditions[0].text = "x > 7"
		@conditions[1].text = "always"
		@conditions[2].text = "always"

		@formulas[0].text = "count"
		@formulas[1].text = "sum"
		@formulas[2].text = "sum/count"

		
		# load settings from user profile, if available
		loadSettings
		
		
		####################################
		# connections
		@rangeSlider.connect(SEL_CHANGED) do |sender, sel, data|
			updateNumbers
		end
		
		@countSlider.connect(SEL_CHANGED) do |sender, sel, data|
			updateNumbers
		end
		
		@goBtn.connect(SEL_COMMAND) do
			updateNumbers
		end
		
		@formulas.each do |formula|
			formula.connect(SEL_CHANGED) do |sender, sel, data|
				updateFormulas
			end
		end

		@conditions.each do |condition|
			condition.connect(SEL_CHANGED) do |sender, sel, data|
				updateFormulas
			end
		end
		
	end
	
	def buildRangeButtons(parent, nrs)
		rangeButtonFrame = FXHorizontalFrame.new(parent, LAYOUT_FILL_X, 0,0,0,0, 0,0,0,0,0,0)
		
		nrs.each do |nr|
			btn = FXButton.new(rangeButtonFrame, "D#{nr}", nil, nil, 0, BUTTON_NORMAL|LAYOUT_FILL_X)
			#btn = FXToggleButton.new(rangeButtonFrame, nr.to_s, nr.to_s, nil, nil, nil, 0, BUTTON_NORMAL|LAYOUT_FILL_X)
			btn.connect(SEL_COMMAND) do |sender, sel, data|
				@rangeSlider.value = nr
				updateNumbers
			end
		end
	end
	

	def updateNumbers
		storeSettings
		@rangeLabel.text = "D#{@rangeSlider.value}"
		@countLabel.text = "#{@countSlider.value} times"
		
		threaded do
			@nrs = Array.new
			
			totaltime = [1, @countSlider.value*0.2].min # wait x seconds
			delay = 0.01
			@countSlider.value.times do
				@nrs.push 0
				(totaltime/(delay*@countSlider.value)).to_i.times do
					@nrs[@nrs.size-1] = rand(@rangeSlider.value)+1
					break if @stopThread
			
					pos = 0
					txt = Array.new
					while @nrs[pos, 5] && !@nrs[pos, 5].empty?
						txt << @nrs[pos, 5].join(", ")
						pos += 5
					end

					@numbers.text = txt.join("    ")
					
					# evalulate formulas
					sleep delay
				end
			end
			updateFormulas
		end
	end
	
	def updateFormulas
		storeSettings
		@formulas.each_index do |i|
			val = evaluate(@conditions[i].text, @formulas[i].text, @nrs)
			@results[i].text = val
		end
	end
	
	# evaluation methods
	def evalCondition(condition, x, max)
		always = true
		never = false
		eval(condition)
	end
	
	def evalFormula(formula, worst, best, sum, count, max)
		always = true
		never = false
		eval(formula)
	end

	def evaluate(condition, formula, nrs)
		result = nil
		begin
			max = @rangeSlider.value
			sum = 0
			worst = nrs[0]
			best = nrs[0]
			count = 0
			nrs.each do |x|
				next if !evalCondition(condition, x, max)
				worst = x if x<worst
				best = x if x>best
				sum += x
				count += 1
			end
			sum = sum.to_f
			worst = worst.to_f
			best = best.to_f
			count = count.to_f
			
			result = evalFormula(formula, worst, best, sum, count, max)
			
			# round result
			if result - result.round < 0.0001
				result = result.round 
			else
				result *= 1000.0
				result = result.round
				result /= 1000.0
			end
		rescue Exception => bang
			result = "???"
		end
		result.to_s
	end
	
	def configStore
		path = ENV['HOME'] || ENV['USERPROFILE'] || ENV['HOMEPATH']
		Dir.chdir path
		PStore.new(".dicerpg")
	end
	# store all settings into user profile
	def storeSettings
		store = configStore
		store.transaction do
			store['dice'] = @rangeSlider.value
			store['times'] = @countSlider.value
			store['w'] = self.width
			h = store['h'] = self.height
			x = store['x'] = self.x
			y = store['y'] = self.y
			@conditions.each_index do |i|
				store["condition #{i}"] = @conditions[i].text
				store["formula #{i}"] = @formulas[i].text
			end
		end
	end
	
	def loadSettings
		begin
			store = configStore
			store.transaction do
				@rangeSlider.value = store['dice']
				@countSlider.value = store['times']
				@conditions.each_index do |i|
					@conditions[i].text = store["condition #{i}"]
					@formulas[i].text = store["formula #{i}"]
				end
			end
		rescue
		end
	end
	
	def threaded
		if @updateThread != nil
			# A thread has to check @stopThread and exist as soon as it is true
			@stopThread = true
			@updateThread.join
		end
		@stopThread = false
		@updateThread = Thread.new(self) do
			yield
		end
	end
	
	
	def create
		super
		show(PLACEMENT_SCREEN)
		updateNumbers
	end
end



# shows an extremely cool and sexy about dialog. Well... whatever.
class FXAboutDialog < FXDialogBox
	def initialize(owner)
		w = 220
		h = 250
		super(owner, "About #{TITLE}", DECOR_ALL, 0, 0, 220, 250, 0, 0, 0, 0)
		@canvas = FXCanvas.new(self, nil, 0, LAYOUT_FILL_X|LAYOUT_FILL_Y, 0, 0, 220, 250)
	end
	
	def create
		super
		@thread = Thread.new do
			time = 0
			while true
				FXDCWindow.new(@canvas) do |dc, app|
					draw(dc, time)
				end
				sleep 0.02
				time += 1
				time = 0 if time >= 1000
			end
		end
	end
	
	def draw(dc, time)
		name = "Dice-RPG"
		font = FXFont.new(getApp(),"System", 10)
		font.create
		dc.setFont(font)
		dc.foreground = @canvas.backColor
		dc.fillRectangle(@canvas.x, @canvas.y, @canvas.width, @canvas.height)
		
		if time > 100
			yPos = 280+100 - time
		else
			yPos = 280
		end
		dc.foreground = "red"
		dc.drawText(30, yPos-220, name)		
		dc.drawText(28, yPos-220, name)		
		dc.drawText(30, yPos-222, name)		
		dc.drawText(28, yPos-222, name)		
		dc.foreground = "black"
		dc.drawText(29, yPos-221, name)
			
		dc.drawText(20, yPos-180, '"My love of it know no limit!"')
		dc.drawText(20, yPos-165, '     -- wyrm')
		
		dc.drawText(20, yPos-140, '"More fps than Doom 3!"')
		dc.drawText(20, yPos-125, '     -- martinus')
		
		dc.drawText(20, yPos-100, '"It got me a girlfriend!"')
		dc.drawText(20, yPos-85, '     -- Fake Guy')
		
		titles.each do |title, names|
			dc.foreground = "blue"
			dc.drawText(10, yPos, title)
			dc.foreground = "black"
			
			names.each do |name|
				dc.drawText(15, yPos + 16, name)
				yPos += 16
			end
			yPos += 25
		end
	end
	
	def stop
		@thread.kill
	end

	def titles
		[
			[ "Engineering Lead", [ "martinus" ] ],
			[ "Core Development Posse", [ "martinus" ] ],
			[ "Visual Design Coordinator", [ "martinus" ] ],
			[ "Brand Identity", [ "martinus" ] ],
			[ "Quality Assurance Lead", [ "wyrm" ] ],
			[ "Quality Assurance", [ "wyrm", "martinus" ] ],
			[ "Build and Release", [ "martinus" ] ],
			[ "Infrastructure Support", [ "martinus" ] ],
			[ "Food Supply", [ "mum" ]],
			[ "Support Resources", [ "mum", "dad" ] ],
			[ "Project Management", [ "martinus" ] ],
			[ "Management Lead", [ "wyrm" ] ],
			[ "Marketing", [ "wyrm" ] ],
			[ "Beta Testers", [ "wyrm", "martinus", "you!" ] ]
		]
	end
end



HELP = %{
Q: What's this?
A: Dice-RPG was created due to the ever increasing demand for high quality
   dice throwing programs. The main motor for this booming industry are 
   role playing games.

Q: Whatever. What can I do with it?
A: It contains presets for the most frequently used dices, can throw several 
   dices at once, and contains an advanced calculator to analyze the results.
   
Q: I like it, how can I support you?
A: Go to http://www.redcross.org/ and donate 1%% of the income of your
   last month to those who are most happy with it. If you do so, I can add
   your name to a hall-of-fame section in the about dialog. I am happy with
   good critique, I made millions with this dice-rolling program anyway.

Q: Where can I get Dice-RPG?
A: The most up-to-date version can always be found at
   http://martin.ankerl.com/files/dice-rpg.rbw

Q: I want to contact you to whatever reason!
A: Mail me: martin.ankerl@gmail.com.
}



if __FILE__ == $0
	$application = FXApp.new("RandomGenerator", "RandomGenerator")
	RandomWindow.new($application)
	$application.create
	$application.run
end



